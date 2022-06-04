2022/6/4

# Pythonのイテラブルとイテレータ

## 環境
- Python 3.9

## イテラブルなオブジェクトとは

for文や内包表記などで使えるオブジェクトのこと

## イテラブルなオブジェクト
```python
class MyIterable:
    def __iter__(self):
        return iter([1,2,3])


for value in MyIterable():
    print(value)
```
イテラブルなオブジェクトの条件
- `__iter__()`を実装している
- `__iter__()`の戻り値は任意のイテレータ

`MyIterable()`はイテラブルなオブジェクトであるがイテレータではない。

## イテレータ
```python
class MyIterator:
    def __init__(self):
        self.list = [1,2,3]
        self.index = 0

    def __iter__(self):
        return self

    def __next__(self):
        try:
            value = self.list[self.index]
        except IndexError:
            raise StopIteration
        else:
            self.index += 1
            return value


for value in MyIterator():
    print(value)
```
イテレータの条件
- `__iter__()`と`__next__()`を実装している
- `__iter__()`の戻り値は`self`

`MyIterator()`はイテレータである。

また、自分自身がイテレータであるので、`__iter__()`の戻り値`self`は（任意の）イテレータとも言える。

即ち`MyIterator()`はイテラブルなオブジェクトでもある。


## 参考文献
- Python実践入門（技術評論社） 8.2節


