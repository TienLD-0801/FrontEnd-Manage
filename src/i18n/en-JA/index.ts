export default {
  translation: {
    dashboard: {
      title: 'ダッシュボード',
      children: {
        default: 'デフォルト',
        category: 'カテゴリ',
        product: '製品',
        schedule: 'スケジュール',
        user: 'ユーザー',
      },
    },
    login: {
      title: 'ログイン',
    },
    register: {},
    product: {
      title: '製品',
    },
    table: {
      column: {
        user: {
          id: 'ID',
          name: '名前',
          email: 'メールアドレス',
          birthDay: '誕生日',
          cardNumber: 'カード番号',
          phone: '電話番号',
          role: '役割',
          action: 'アクション',
        },
        category: {
          id: 'ID',
          categoryName: 'カテゴリ名',
          action: 'アクション',
        },
        product: {
          id: 'ID',
          productName: '商品名',
          categoryName: 'カテゴリ名',
          urlImg: '画像 URL',
          description: '説明',
          action: 'アクション',
        },
      },
      user: {
        title: 'ユーザーテーブル',
        buttonCreate: 'ユーザーを作成',
      },
      product: {
        title: '製品テーブル',
        buttonCreate: '製品を作成',
      },
      category: {
        title: 'カテゴリテーブル',
        buttonCreate: 'カテゴリを作成',
      },
      rowPerPage: 'ページごとの行数',
    },
    dialog: {
      user: {
        create: {
          title: 'ユーザーの作成',
          name: '名前',
          email: 'メールアドレス',
          password: 'パスワード',
          cardNumber: 'カード番号',
          phone: '電話番号',
        },
        edit: {
          title: 'ユーザーの編集',
          name: '名前',
          email: 'メールアドレス',
          password: 'パスワード',
          cardNumber: 'カード番号',
          phone: '電話番号',
        },
        delete: {
          title: 'ユーザーの削除',
          content: 'ユーザーを削除しますか',
        },
      },
      product: {
        create: {
          title: '製品を作成',
          nameProduct: '製品名',
          categoriesName: '製品カテゴリ',
          urlImg: '製品画像',
          description: '製品説明',
          price: '製品価格',
          titleUpdateFile: '画像を更新する',
          noImage: '画像がありません',
        },
        edit: {
          title: '商品を編集する',
          nameProduct: '商品名',
          categoriesName: '商品カテゴリ',
          urlImg: '商品画像',
          description: '商品の説明',
          price: '商品価格',
          titleUpdateFile: '画像を更新する',
          noImage: '画像がありません',
        },
        delete: {
          title: '製品を削除',
          content: '製品を削除してもよろしいですか',
        },
        warning: {
          title: '警告',
          content:
            '現在、カテゴリリストが存在しません。製品の作成を開始するには、カテゴリリストを更新してください。ありがとうございます！',
        },
      },
      category: {
        create: {
          title: 'カテゴリを作成',
          categoryName: 'カテゴリ名',
        },
        delete: {
          title: 'カテゴリを削除',
          content: 'カテゴリを削除しますか',
        },
        warning: {
          title: '警告',
          content:
            '現在の製品リストでこのカテゴリが使用されています。削除できません。ありがとうございます！',
        },
      },
      button: {
        cancel: 'キャンセル',
        save: '保存',
        close: '閉じる',
      },
    },
  },
};
