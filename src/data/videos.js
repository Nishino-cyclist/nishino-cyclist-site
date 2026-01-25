// ========================================
// モック動画データ - にしの@自転車Vtuber
// 実際のYouTube APIと連携する場合は、このファイルを置き換えてください
// ========================================

// 最新動画リスト
export const latestVideos = [
    {
        id: 'video1',
        title: 'レース！ in Zwift',
        thumbnail: 'https://picsum.photos/seed/zwift1/640/360',
        views: '新着',
        date: '2026年1月25日',
        duration: '1:23:45',
        url: 'https://www.youtube.com/@Nishino_cyclist'
    },
    {
        id: 'video2',
        title: '【朝活】Zwiftでトレーニング配信',
        thumbnail: 'https://picsum.photos/seed/zwift2/640/360',
        views: '156回視聴',
        date: '2026年1月24日',
        duration: '2:15:30',
        url: 'https://www.youtube.com/@Nishino_cyclist'
    },
    {
        id: 'video3',
        title: '【雑談】新しいサイクルジャージが届いた！',
        thumbnail: 'https://picsum.photos/seed/cycling1/640/360',
        views: '234回視聴',
        date: '2026年1月22日',
        duration: '45:20',
        url: 'https://www.youtube.com/@Nishino_cyclist'
    },
    {
        id: 'video4',
        title: '【Vlog】早朝ライド in 多摩川',
        thumbnail: 'https://picsum.photos/seed/vlog1/640/360',
        views: '312回視聴',
        date: '2026年1月20日',
        duration: '18:45',
        url: 'https://www.youtube.com/@Nishino_cyclist'
    }
];

// 人気動画リスト
export const popularVideos = [
    {
        id: 'pop1',
        title: '【激痛!?】狭山湖周回で大転倒！ #CyclingVlog',
        thumbnail: 'https://picsum.photos/seed/popular1/640/360',
        views: '1,000回視聴',
        date: '2025年3月15日',
        duration: '25:30',
        url: 'https://www.youtube.com/@Nishino_cyclist'
    },
    {
        id: 'pop2',
        title: '【初心者向け】ロードバイクの選び方完全ガイド',
        thumbnail: 'https://picsum.photos/seed/popular2/640/360',
        views: '2,500回視聴',
        date: '2025年1月10日',
        duration: '32:15',
        url: 'https://www.youtube.com/@Nishino_cyclist'
    },
    {
        id: 'pop3',
        title: '【ビワイチ】琵琶湖一周200km走ってみた！',
        thumbnail: 'https://picsum.photos/seed/popular3/640/360',
        views: '1,800回視聴',
        date: '2025年5月20日',
        duration: '45:00',
        url: 'https://www.youtube.com/@Nishino_cyclist'
    },
    {
        id: 'pop4',
        title: '【Zwift】FTPテストに挑戦！結果は...？',
        thumbnail: 'https://picsum.photos/seed/popular4/640/360',
        views: '890回視聴',
        date: '2025年8月5日',
        duration: '1:05:20',
        url: 'https://www.youtube.com/@Nishino_cyclist'
    }
];

// 活動リンク (各種SNS・プラットフォーム)
export const activityLinks = [
    {
        id: 'youtube',
        name: 'YouTube',
        description: 'メインの活動場所！配信・動画はこちら',
        url: 'https://www.youtube.com/@Nishino_cyclist',
        icon: 'youtube',
        color: '#FF0000'
    },
    {
        id: 'twitter',
        name: 'X (Twitter)',
        description: '日常のつぶやき・配信告知',
        url: 'https://twitter.com/Nishino_cyclist',
        icon: 'twitter',
        color: '#000000'
    },
    {
        id: 'marshmallow',
        name: 'マシュマロ',
        description: '匿名でメッセージを送れます',
        url: 'https://marshmallow-qa.com/nishino_cyclist?t=fja3aV&utm_medium=url_text&utm_source=promotion',
        icon: 'message-circle',
        color: '#FF69B4'
    },
    {
        id: 'booth',
        name: 'BOOTH',
        description: 'オリジナルグッズ販売中！',
        url: 'https://nishino-chan.booth.pm',
        icon: 'shopping-bag',
        color: '#FC4D50'
    },
    {
        id: 'wishlist',
        name: '欲しいものリスト',
        description: '応援してくれる方はこちらから',
        url: 'https://www.amazon.jp/hz/wishlist/ls/3TGUX88IA4LR?ref_=wl_share',
        icon: 'gift',
        color: '#FF9900'
    },
    {
        id: 'zwift',
        name: 'Zwift',
        description: 'ID: 🦘Nishino Vtuber(24noR)',
        url: 'https://www.zwift.com/',
        icon: 'bike',
        color: '#FC6719'
    },
    {
        id: 'discord',
        name: 'Discord',
        description: 'レース時通話サーバー',
        url: 'https://discord.gg/9X8P3Bae5b',
        icon: 'headphones',
        color: '#5865F2'
    },
    {
        id: 'note',
        name: 'note',
        description: 'ブログ・記事はこちら',
        url: 'https://note.com/nishino_rider',
        icon: 'file-text',
        color: '#41C9B4'
    }
];

// ハッシュタグ情報
export const hashtags = {
    illustration: '#自転車仁志乃',    // 絵のタグ
    stream: '#24noR',                 // 配信タグ
    team: ['#Nishinoレーシング', '#仁志乃旅団'] // チームメイト用
};

// プロフィール情報
export const profileInfo = {
    name: 'にしの',
    title: '自転車Vtuber',
    tagline: '目があったね！！一緒に自転車して！？',
    description: 'ロードバイクとVtuberが大好きな自転車系バーチャルYouTuber。Zwift配信、サイクリングVlog、ゲーム実況などを中心に活動中！',
    channelUrl: 'https://www.youtube.com/@Nishino_cyclist',
    // 詳細プロフィール
    details: {
        birthday: '2月4日（天秤座）',
        age: 'お酒飲める年齢',
        species: 'カンガルー美少女',
        height: '耳込みで170cm',
        likes: '自転車、お酒、ゲーム',
        dislikes: '雷⚡'
    }
};
