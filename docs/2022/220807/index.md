2022/8/7

# INNER JOINとforeachループの速度差

1. 小説家になろうのランキングAPIからランキングデータを取得する (ncode, pt, rank)
2. 一件ずつRankings_sourceテーブルに登録する
3. Rankings_sourceテーブルから今までのランクイン回数を集計してデータに追加する
4. Rankingsテーブルに(ncode, pt, rank, rankin_count)で登録する

という流れで   

## `INNER JOIN` で取得
```php
$pdo = Database::getPdo();

$stmt = $pdo->prepare(
    "SELECT r1.ncode, r1.pt, r1.rank, r2.rankin_count
    FROM Rankings_source AS r1
        INNER JOIN (
            SELECT ncode, count(*) AS rankin_count
            FROM Rankings_source
            WHERE date <= :r2_date AND type = :r2_type
            GROUP BY ncode
        ) AS r2
        ON r1.ncode = r2.ncode
    WHERE r1.date = :r1_date AND r1.type = :r1_type
    ORDER BY r1.rank;
"
);
$stmt->execute([
    ':r2_date' => $date,
    ':r2_type' => $type,
    ':r1_date' => $date,
    ':r1_type' => $type
]);
$fetchedData = $stmt->fetchAll();

var_dump($fetchedData);
```

## 該当データを抜き出してncode毎にループを回してカウントデータを追加
```php
$pdo = Database::getPdo();

$stmt = $pdo->prepare(
    "SELECT ncode, pt, rank
    FROM Rankings_source
    WHERE date = :date AND type = :type
    ORDER BY rank
"
);
$stmt->execute([
    ':date' => $date,
    ':type' => $type
]);
$fetchedData = $stmt->fetchAll();

$pdo->beginTransaction();

$rankingList = [];
foreach ($fetchedData as $index => $rankData) {
    $ncode = $rankData['ncode'];
    // 該当するncodeのカウント
    $stmt = $pdo->prepare(
        "SELECT count(*)
        FROM Rankings_source
        WHERE date <= :date AND type = :type AND ncode = :ncode
        "
    );
    $stmt->execute([
        ':date' => $date,
        ':type' => $type,
        ':ncode' => $ncode

    ]);
    $count = $stmt->fetchColumn();
    $rankData['rankin_count'] = $count;
    array_push($rankingList, $rankData);
}

$pdo->commit();

var_dump($rankingList);
```

## 結果
`INNER JOIN`の方が明らかに早かった（計測しなくても目視でわかるくらい）   
というか`foreach`ループがものすごく遅いというべき？   

Rankings_sourceテーブルは現状133万行あるのでその全部のncodeを`GROUP BY`してカウントしてそのうち該当する分だけを`INNER JOIN`するのは無駄が多くて、必要なncodeの分だけをループで回してカウントする方が断然早いだろうと思っていたので意外すぎる結果…

何かを間違えてるような気がしないでもない