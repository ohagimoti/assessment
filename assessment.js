(function(){
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    /**
     * 指定した要素の子供をすべて削除する
     * @param {HTMLElement} element HTML の要素
     */
    function removeAllChildren(element) {
        while (element.firstChild) {//子どもの要素がある限り削除
            element.removeChild(element.firstChild);
        }
    }
    

    userNameInput.onkeydown = (event) => {
        if(event.key === 'Enter') {
            assessmentButton.onclick();
        }
    };
    assessmentButton.onclick = () => {
        const userName = userNameInput.value;
        if (userName.length === 0) {//名前が空の時は処理を終了する
            return;
        }
        console.log(userName);
        // TODO　診断結果表示エリアの作成
        while (resultDivided.firstChild) {//子供の要素がある限り削除
            resultDivided.removeChild(resultDivided.firstChild);
        }
        const header = document.createElement('h3');
        header.innnerText = '診断結果';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        // ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ'
        + encodeURIComponent('あなたのいいところ')
        + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href',hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text',result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);
    twitter.widgets.load();

    };
    const answers = [
        '{userName}の良いところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
        '{userName}の良いところはまなざしです。{userName}に見つめられた人は、気になって仕方がない。',
        '{userName}の良いところは情熱です。{userName}の情熱に周りの人は感化されます。',
        '{userName}の良いところは厳しさです。{userName}の厳しさが物事をいつも成功に導きます。',
        '{userName}の良いところは知識です。博識な{userName}を多くの人が頼りにしています。',
        '{userName}の良いところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
        '{userName}の良いところは用心深さです。{userName}の洞察に多くの人が助けられます。',
        '{userName}の良いところは見た目です。{userName}の良さに皆が気を惹かれます。',
        '{userName}の良いところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
        '{userName}の良いところは思いやりです。{userName}に気をかけてもらった多くの人が救われます。',
        '{userName}の良いところは感受性です。{userName}が感じたことをみんなが共感し、分かり合うことができます。',
        '{userName}の良いところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
        '{userName}の良いところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
        '{userName}の良いところは気配りです。{userName}の配慮が多くの人を救っています。',
        '{userName}の良いところはそのすべてです。ありのままの{userName}自身がいいところなのです。',
        '{userName}の良いところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}がみんなから評価されます。',
    ];
    /**
     * 名前の文字列を渡すと診断結果を返す関数
     * @param {string} userName ユーザーの名前
     * @return {string} 診断結果
     */
    function assessment(userName) {
        //全文字のコード番号を取得してそれを足し合わせる
        let sumOfcharCode = 0;
        for(let i = 0; i < userName.length; i++) {
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }

        //文字のコード番号の合計を回答の数で割って添え字の数値を求める
        const index = sumOfcharCode % answers.length;
        let result = answers[index];
        result = result.replace(/\{userName\}/g, userName);
        return result;
    }
    //テストコード
    console.assert(
        assessment('太郎') === '太郎の良いところは決断力です。太郎がする決断にいつも助けられる人がいます。',
        '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません '
    );
    console.assert(
        assessment('太郎') === assessment('太郎'),
        '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
    );
})();
