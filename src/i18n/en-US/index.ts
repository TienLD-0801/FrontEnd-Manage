export default {
  translation: {
    dashboard: {
      title: 'Dashboard',
      children: {
        default: 'DEFAULT',
        category: 'CATEGORY',
        product: 'PRODUCT',
        schedule: 'SCHEDULE',
        user: 'USER',
      },
    },
    login: {
      title: 'Login',
    },
    register: {},
    product: {
      title: 'Product',
    },
    table: {
      column: {
        user: {
          id: 'ID',
          name: 'Name',
          email: 'Email',
          birthDay: 'Birth Day',
          cardNumber: 'Card Number',
          phone: 'Phone',
          role: 'Role',
          action: 'Action',
        },
        category: {
          id: 'ID',
          categoryName: 'Category Name',
          action: 'Action',
        },
        product: {
          id: 'ID',
          productName: 'Product Name',
          categoryName: 'Category Name',
          urlImg: 'Url Img',
          description: 'Description',
          action: 'Action',
        },
      },
      user: {
        title: 'Table user',
        buttonCreate: 'Create user',
      },
      product: {
        title: 'Table product',
        buttonCreate: 'Create product',
      },
      category: {
        title: 'Table category',
        buttonCreate: 'Create category',
      },
      rowPerPage: 'Rows per page',
    },
    dialog: {
      user: {
        create: {
          title: 'Create user',
          name: 'Name',
          email: 'Email',
          password: 'Password',
          cardNumber: 'Card Number',
          phone: 'Phone',
        },
        edit: {
          title: 'Edit user',
          name: 'Name',
          email: 'Email',
          password: 'Password',
          cardNumber: 'Card Number',
          phone: 'Phone',
        },
        delete: {
          title: 'Delete user',
          content: 'Are you sure you want to delete the user',
        },
      },
      product: {
        create: {
          title: 'Create product',
          nameProduct: 'Product name',
          categoriesName: 'Product category',
          urlImg: 'Product image',
          description: 'Product description',
          price: 'Product price',
          titleUpdateFile: 'Update image',
          noImage: 'No image',
        },
        edit: {
          title: 'Edit product',
          nameProduct: 'Product name',
          categoriesName: 'Product category',
          urlImg: 'Product image',
          description: 'Product description',
          price: 'Product price',
          titleUpdateFile: 'Update image',
          noImage: 'No image',
        },
        delete: {
          title: 'Delete product',
          content: 'Are you sure you want to delete the product',
        },
      },
      category: {
        delete: {
          title: 'Delete category',
          content: 'Are you sure you want to delete the category',
        },
      },
      button: {
        cancel: 'Cancel',
        save: 'Save',
      },
    },
  },
};
