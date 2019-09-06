(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

let data = {
  donor_count: 70,
  donation_goal: 5000,
  total_donated: 1500,
  goal_reached: false
}

let donate_button = document.querySelector("#donate-button");
let donor_count_elem = document.querySelector("#donor-count");
let donation_amount_left_elem = document.querySelector("#amount-left");
let progress_bar = document.querySelector("#progress");

donate_button.onclick = function() {
  console.log("updating...");
  console.log(data.donor_count);
  let donatation_value = parseInt(document.querySelector("#donation-amount").value);
  updateDonationData(donatation_value);
  updateProgress();
}

let updateDonationData = function(amount) {
  console.log(data.total_donated);
  data.total_donated += amount;
  console.log(data.total_donated);
  data.donor_count += 1;

  let amount_left = data.donation_goal - data.total_donated;
  donation_amount_left_elem.innerHTML = amount_left;
  donor_count_elem.innerHTML = data.donor_count;
  return;
}

let updateProgress = function() {
  let progress_percent = (data.total_donated/data.donation_goal)*100;
  progress_bar.style.width = Math.floor(progress_percent).toString() + '%';
  return;
}

},{}]},{},[1])