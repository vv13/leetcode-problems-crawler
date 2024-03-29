# leetcode-problems-crawler
[problems](./problems) directory is generated by `cd problems && npx leetcode-problems-crawler -r 1-10`

## Usage
crawling problem 1 to 5:
```
$ npx leetcode-problems-crawler -r 1-5
```

crawling problem 1、2、3:
```
$ npx leetcode-problems-crawler -r 1,2,3
```

just crawling problem 5:
```
$ npx leetcode-problems-crawler -r 5
```

then we will get directory like below:
```
├── 001.two-sum
│   ├── information.json
│   ├── Solution.py
│   ├── README.md
├── 002.add-two-numbers
│   ├── information.json
│   ├── Solution.py
│   ├── README.md
...
```

There are some useful options:
```
Usage: leetcode-problem-crawler [options]

Options:
  -r, --rule <string>  crawling rule, eg1: 1-10, eg2: 1,2,3, eg3: 5
  -i, --i18n <string>  currently support en and cn, default is en. (default: "en")
  -l, --lang <string>  generate code snippet by language, like: golang, or pass golang,python3 to generate both. (default: "python3")
  -h, --help           display help for command
```

with `-l`, now support:
```
    csharp -> '.cs',
    java -> '.java',
    javascript -> '.js',
    php -> '.php',
    python -> '.py',
    python3 -> '.py'
    cpp -> '.cpp'
    c -> '.c'
    ruby -> '.rb'
    swift -> '.swift'
    golang -> '.go'
    scala -> '.scala',
    kotlin -> '.kt'
    rust -> '.rs'
    typescript -> '.ts'
    racket -> '.rkt'
    erlang -> '.erl'
    elixir -> '.ex'
    dart -> '.dart'
```

Welcome folk and customization.
