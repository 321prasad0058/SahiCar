#!/usr/bin/env python3
"""Merge one car's model branch into the current branch without splicing specs into each other.

usage: python3 scripts/trace/merge-car.py <branch> <EXPORT_NAME[,EXPORT2]> <car-id[,car-id2]>   (one build may carry two related cars)

exact.ts, specs.ts (READY), CarDetail.tsx (SHOWCASE_IDS) and PLAYBOOK.md are rebuilt from the current version plus
only what the branch ADDED since it forked (checked: the branch must not have changed anything else in them). Other
files are merged by git as usual. Leaves the merge staged but uncommitted, so it can be type-checked first.
"""
import difflib, re, subprocess, sys

branch, exports, cars_arg = sys.argv[1:4]
exports = [e for e in exports.split(',') if e]
cars = [c for c in cars_arg.split(',') if c]
sh = lambda *a: subprocess.run(a, check=True, capture_output=True, text=True).stdout
base = sh('git', 'merge-base', 'HEAD', branch).strip()
show = lambda rev, path: sh('git', 'show', f'{rev}:{path}')

def added(path, strip=lambda s: s):
    """the lines the branch added to path since base, as one block; fails if it changed or removed anything"""
    b, t = strip(show(base, path)).splitlines(), strip(show(branch, path)).splitlines()
    out = []
    for op, i1, i2, j1, j2 in difflib.SequenceMatcher(None, b, t, autojunk=False).get_opcodes():
        if op == 'equal':
            continue
        if op != 'insert':
            sys.exit(f'{path}: the branch changed existing lines ({op} {b[i1:i2][:2]}), resolve by hand')
        out += t[j1:j2]
    return '\n'.join(out).strip('\n')

EX = re.compile(r"export const EXACT: CarSpec\[\] = \[([^\]]*)\]\n")
head = show('HEAD', 'src/webgl/cars/exact.ts')
names = EX.search(head).group(1)
# check the branch only ADDED to exact.ts before touching anything: a refusal leaves the repo as it was
section = added('src/webgl/cars/exact.ts', lambda s: EX.sub('', s))
lessons = added('scripts/trace/PLAYBOOK.md')

subprocess.run(['git', 'merge', '--no-commit', '--no-ff', branch], capture_output=True, text=True)
exact = EX.sub('', head).rstrip('\n') + '\n\n' + section + f'\n\nexport const EXACT: CarSpec[] = [{names}, {", ".join(exports)}]\n'
open('src/webgl/cars/exact.ts', 'w').write(exact)

def add_id(path, pattern):
    s = show('HEAD', path)
    for car in cars:
        m = re.search(pattern, s)
        if f"'{car}'" not in m.group(0):
            s = s[: m.end() - 1] + f", '{car}'" + s[m.end() - 1 :]
    open(path, 'w').write(s)

add_id('src/webgl/cars/specs.ts', r"const READY: string\[\] = \[[^\]]*\]")
add_id('src/pages/CarDetail.tsx', r"const SHOWCASE_IDS = \[[^\]]*\]")
pb = show('HEAD', 'scripts/trace/PLAYBOOK.md').rstrip('\n') + ('\n' + lessons if lessons else '') + '\n'
open('scripts/trace/PLAYBOOK.md', 'w').write(pb)

subprocess.run(['git', 'add', 'src/webgl/cars/exact.ts', 'src/webgl/cars/specs.ts', 'src/pages/CarDetail.tsx', 'scripts/trace/PLAYBOOK.md'], check=True)
left = sh('git', 'diff', '--name-only', '--diff-filter=U').strip()
print(f'{"+".join(cars)}: {section.count(chr(10)) + 1} spec lines added' + (f'; still conflicted: {left}' if left else '; ready to type-check and commit'))
