export default {
  translation: {
    dashboard: {
      title: '仪表板',
      children: {
        default: '默认',
        category: '类别',
        product: '产品',
        schedule: '日程安排',
        user: '用户',
      },
    },
    login: {
      title: '登录',
    },
    register: {},
    product: {
      title: '产品',
    },
    table: {
      column: {
        user: {
          id: 'ID',
          name: '姓名',
          email: '电子邮件',
          birthDay: '生日',
          cardNumber: '卡号',
          phone: '电话号码',
          role: '角色',
          action: '操作',
        },
        category: {
          id: 'ID',
          categoryName: '类别名称',
          action: '操作',
        },
        product: {
          id: 'ID',
          productName: '产品名称',
          categoryName: '类别名称',
          urlImg: '图片网址',
          description: '描述',
          action: '操作',
        },
      },
      user: {
        title: '用户表',
        buttonCreate: '创建用户',
      },
      product: {
        title: '产品表',
        buttonCreate: '创建产品',
      },
      category: {
        title: '类别表',
        buttonCreate: '创建类别',
      },
      rowPerPage: '每页行数',
    },
    dialog: {
      user: {
        create: {
          title: '创建用户',
          name: '姓名',
          email: '电子邮件',
          password: '密码',
          cardNumber: '卡号',
          phone: '电话号码',
        },
        edit: {
          title: '编辑用户',
          name: '姓名',
          email: '电子邮件',
          password: '密码',
          cardNumber: '卡号',
          phone: '电话号码',
        },
        delete: {
          title: '删除用户',
          content: '你确定要删除用户吗',
        },
      },
      product: {
        create: {
          title: '创建产品',
          nameProduct: '产品名称',
          categoriesName: '产品类别',
          urlImg: '产品图片',
          description: '产品描述',
          price: '产品价格',
          titleUpdateFile: '更新图片',
          noImage: '沒有圖片',
        },
        edit: {
          title: '编辑产品',
          nameProduct: '产品名称',
          categoriesName: '产品类别',
          urlImg: '产品图片',
          description: '产品描述',
          price: '产品价格',
          titleUpdateFile: '更新图片',
          noImage: '无图片',
        },
        delete: {
          title: '删除产品',
          content: '您确定要删除产品吗',
        },
      },
      category: {
        delete: { title: '删除类别', content: '是否删除类别' },
      },
      button: {
        cancel: '取消',
        save: '保存',
      },
    },
  },
};
