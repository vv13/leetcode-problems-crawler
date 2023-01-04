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
│   ├── README.md
├── 002.add-two-numbers
│   ├── information.json
│   ├── README.md
...
```

There are some useful options:
```
Options:
  -r, --rule <string>     crawling rule, eg1: 1-10, eg2: 1,2,3, eg3: 5
  -l, --lang <string>  generate code snippet with language, default is python3
  -h, --help              output usage information
```

with `-l`, now support:
```
    csharp -> '.cs',
    java -> '.java',
    javascript -> '.js',
    php -> '.php',
    python -> '.py',
    python3 -> '.py'
```

Welcome folk and customization.
