---
title: "GoogleAppsScriptでリストの変換作業を行う"
date: "2021-08-04"
description: "事例"
tags:
  - GoogleAppsScript
  - JavaScript
---

完全に事例なのであまり流用できなそうな気がするけど残しておく

管理職的なことを始めるとこういうのをサクッとかけると割と便利そう

対象を選定する場合は上の表で、展開するときは下の表が見やすいよねっていう感じ

こういう表を

| x | x | 被評価者 | 評価者1 | 評価者2 | 評価者3 | 評価者4 |
|:-|:-|:-|:-|:-|:-|:-|
| x | x | A | B | C | | |
| x | x | B | A | C | | |
| x | x | C | A | B | D | E |
| x | x | D | A | | | |
| x | x | E | B | C | | |

こういう感じに変換するGASスクリプトを書いた

| 評価者 | 被評価者1 | 被評価者2 | 被評価者3 |
|:-|:-|:-|:-|
| B | A | C | E |
| C | A | B | E |
| A | B | C | D |
| D | C | | |
| E | C | | |

- Code.js

```javascript
function convertEvaluatorList(acc, curLine) {
  const [target, ...evaluators] = curLine;

  evaluators.filter(name => name !== '').forEach(evaluator => {
    const targetLine = acc.find(line => line[0] === evaluator);
    if(targetLine === undefined) {
      acc.push([evaluator, target]);
    }
    else {
      targetLine.push(target)
    }
  });

  return acc;
}
function myFunction() {
  // config ================================================================
  const masterSheetName = 'シート1';
  const convertSheetName = 'シート2';
  const startColumnNumber = 2; // C = 2
  const startRowNumber = 1; // 2 - 1 = 1
  // config ================================================================

  const columns = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const masterSheet = ss.getSheetByName(masterSheetName);

  const convertedList = masterSheet.getDataRange().getValues().slice(startRowNumber).map(line => line.slice(startColumnNumber)).reduce(convertEvaluatorList, []);

  const maxColumns = convertedList.reduce((acc, lines) => Math.max(acc, lines.length), 0);

  const filledList = convertedList.map(lines => {
    const fillNum = maxColumns - lines.length;
    const fillValues = new Array(fillNum).fill('');
    return [...lines, ...fillValues];
  });

  const targetSheet = ss.getSheetByName(convertSheetName);
  // ヘッダー行を除くので+1
  const lines = filledList.length + 1;
  // Aから埋めていくのでカラム数-1
  targetSheet.getRange(`A2:${columns[maxColumns - 1]}${lines}`).setValues(filledList);
}
```

<!-- textlint-disable prh -->
スプレッド演算子を駆使してimmutableに…とは行かなかった
<!-- textlint-enable prh -->