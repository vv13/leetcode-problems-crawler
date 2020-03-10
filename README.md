# leetcode-problems-crawler

## Usage
crawling problem 1 to 5:
```
$ npx leetcode-problem-crawler -r 1-5
```

crawling problem 1、2、3:
```
$ npx leetcode-problem-crawler -r 1,2,3
```

just crawling problem 5:
```
$ npx leetcode-problem-crawler -r 5
```

then we will get problems directory like below:
```
problems
├── 001.two-sum.easy
│   ├── README.md
├── 002.add-two-numbers.medium
│   ├── README.md
...
```

There are some useful options:
```
Options:
  -r, --rule <string>     crawling rule, eg1: 1-10, eg2: 1,2,3, eg3: 5
  -d, --dir <string>      download dirname (default: "problems")
  -i, --initial <string>  generate code snippet in solution.[suffix]
  -h, --help              output usage information
```

with `-i`, now support:
```
    csharp -> '.cs',
    java -> '.java',
    javascript -> '.js',
    php -> '.php',
    python -> '.py',
    python3 -> '.py'
```

See fetch data in [problems](./problems).
