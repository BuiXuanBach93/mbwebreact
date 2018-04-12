const constants = {
    regEx: {
        hashTags: /[#＃][^\s!@#＃$%^&*()=+./,\[{\]};:'"?><]+/gi,
    },
    postStatus: {
        PUBLIC: 'PUBLIC',
        IN_CONVERSATION: 'IN_CONVERSATION',
        TEND_TO_SELL: 'TEND_TO_SELL',
        SOLD: 'SOLD',
        SUSPENDED: 'SUSPENDED',
        DELETED: 'DELETED'
    },
    postStatusText: {
        PUBLIC: '公開中',
        // IN_CONVERSATION: '交渉中',
        // TEND_TO_SELL: '取引意思確認中',
        IN_CONVERSATION: '公開中',
        TEND_TO_SELL: '公開中',
        SOLD: '受付終了',
        SUSPENDED: '停止中',
        DELETED: '削除'
    },
    genderText: {
        MALE: '男性',
        FEMALE: '女性'
    },
    postType: {
        SELL: 'SELL',
        BUY: 'BUY'
    },
    reviewType: {
        ALL: 'ALL',
        GOOD: 'GOOD',
        FAIR: 'FAIR',
        BAD: 'BAD'
    },
    sortTypes: ['新着順', '価格の安い順', '価格の高い順'],

    sortKeys: ['createdAtDesc', 'priceAsc', 'priceDesc']
    
    
}
export default constants