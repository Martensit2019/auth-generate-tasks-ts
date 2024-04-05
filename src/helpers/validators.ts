export const validators = {
  email: {
    // eslint-disable-next-line no-useless-escape
    regx: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    msg: 'Неправильный Email'
  }
}