# leetcode-problems-crawler

## Usage
crawling problem 1 to 5:
```
$ npx leetcode-problem-crawler -s 1 -e 5
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
  -s, --start <number>    problem start index
  -e, --end <number>      problem end index
  -d, --dir <string>      download dirname (default: "problems")
  -i, --initial <string>  generate code snippet in solution.[language_file_suffix]
  -h, --help              output usage information
```

See fetch data in [problems](./problems).
