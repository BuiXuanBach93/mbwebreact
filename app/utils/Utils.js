
class Utils {

  /* Japan currency formater from number */
  static japanCurrency = (number) => {
    const num = number + 0

    var currency = '¥ ' + Utils.formatNumber(num, '.', ',')
    return currency
  };

  static formatNumber = (n, d, t) => {
      var c = 0,
      d = d == undefined ? "." : d,
      t = t == undefined ? "," : t,
      s = n < 0 ? "-" : "",
      i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
      j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  };
  // Format Date '2017/02/02'
  static formatDate = (dateString) => {
    if (dateString !== null) {
      var date = dateString.slice(0, 10).replace(/-/g, '/')
      return date
    }
  }

  // Format Date '2017/02/02 20:15:20'
  static formatFullDate = (dateString) => {
    var date = new Date(dateString)
    var dateTime = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2)
      + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getMilliseconds()).slice(-2);
    return dateTime
  }

  // Get age
  static getAge = (dateString) => {
    if (dateString !== null) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
    return '';
  }
  // Get Gender
  static getGender = (genderString) => {
    var gender = "男性"
    if (genderString == "FEMALE")
      gender = "女性"
    return gender;
  }
}
export default Utils