function reverseStr(str) {
    return reversedStr = str.split('').reverse().join('');
  }
  
  function checkPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse;
  }
  
  function convertDateToStr(date) {
  
    var dateStr = { day: '', month: '', year: '' };
  
    if (date.day < 10) {
      dateStr.day = '0' + date.day;
    }
    else {
      dateStr.day = date.day.toString();
    }
  
    if (date.month < 10) {
      dateStr.month = '0' + date.month;
    }
    else {
      dateStr.month = date.month.toString();
    }
  
    dateStr.year = date.year.toString();
    return dateStr;
  }
  
  function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);
  
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  }
  
  function checkPalindromeForAllDateFormats(date){
    var listOfPalindromes = getAllDateFormats(date);
  
    var flag = false;
  
    for(var i=0; i < listOfPalindromes.length; i++){
      if(checkPalindrome(listOfPalindromes[i])){
        flag = true;
        break;
      }
    }
    
    return flag;
  }
  
  function isLeapYear(year){
    if(year % 400 === 0){
      return true;
    }
    if(year % 100 === 0){
      return false;
    }
    if(year % 4 === 0){
      return true;
    }
    return false;
  }
  
  function getNextDate(date){
    var day = date.day + 1;  
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; 
  
    if(month === 2)
    { 
      if(isLeapYear(year)){ 
           day = 1;
           month++;  
         }
      else {
         if(day > 28){
           day = 1;
           month++;  
         }
      }
    }
    
    else {
     
      if(day > daysInMonth[month - 1]){ 
        day = 1; 
        month++;  
      }
    }
  
   
    if(month > 12){
      month = 1;
      year++; 
    }
  
    return {
      day: day,  
      month: month,
      year: year
    };
  }
  
  
  function getNextPalindromeDate(date){
    var counter = 0;
    var nextDate = getNextDate(date);
  
    while(1){
      counter++;
      var checkPalindrome = checkPalindromeForAllDateFormats(nextDate);
      if(checkPalindrome){
        break;
      }
      nextDate = getNextDate(nextDate);
    }
    return [counter, nextDate];
  }
  
  const dateInput = document.querySelector('#date');
  const checkBtn = document.querySelector('#btn');
  const output = document.querySelector('#output');
  const loadingAnime = document.querySelector(".animation");
  
  checkBtn.addEventListener('click', clickHandler);
  dateInput.addEventListener('click', () =>{
    output.style.display = 'none';
  });
  // function reset(e){}
  function clickHandler(e){
    var bdayStr = dateInput.value; 
    output.style.display = 'none';

    if(bdayStr !== ''){
      loadingAnime.style.display = 'block';
      var listOfDate = bdayStr.split('-'); 
      var date = {
        day: Number(listOfDate[2]),
        month: Number(listOfDate[1]),
        year: Number(listOfDate[0])
      };
      
      setTimeout(() =>{
        loadingAnime.style.display = 'none';
        output.style.display = 'block';
        var checkPalindrome = checkPalindromeForAllDateFormats(date);
        
      if(checkPalindrome){
         output.innerText = 'Yay! your birthday is a palindrome!! 🥳🥳';
      }
      else {
        var [counter, nextDate] = getNextPalindromeDate(date);
        output.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${counter} days! 😔`;
      }

      }, 3500);
    }  
  }
  