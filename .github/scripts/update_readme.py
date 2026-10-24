import re
from pathlib import Path
from urllib.parse import quote

REPO_URL = "https://github.com/woneeeee/daily_algorithm/tree/main"
root = Path(__file__).resolve().parents[2]

problems = []
for d in root.iterdir():
    m = re.match(r"^(\d+)\.\s", d.name)
    if d.is_dir() and m:
        problems.append((int(m.group(1)), d.name))
problems.sort()

lines = [
    "# 프로그래머스 문제 풀이 목록",
    "",
    "## 문제 목록",
    "",
    "| 문제번호 | 링크 |",
    "| :--- | :---: |",
]
for _, name in problems:
    title = re.sub(r"\s+", " ", name)
    lines.append(f"| {title} | [링크]({REPO_URL}/{quote(name)}) |")

(root / "README.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
