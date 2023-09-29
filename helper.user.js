// ==UserScript==
// @name         moeisind Helper Form Vaccine Anak
// @namespace    https://github.com/tbx0/helperMoeIS
// @version      1.0
// @description  Unhide elements hidden by web developers to simplify the information filling process for parents. Also, auto-copy and paste for DTaP, HIB, IPV, and MMR vaccine dates.
// @author       You
// @match        https://moeisind.moe.gov.my/profil/anak/*
// @icon         https://raw.githubusercontent.com/tbx0/helperMoeIS/gh-pages/images/logo_idms.png
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  function unhideElements(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.style.display = '';
    });
  }

  function copyPasteDates(source, targets) {
    source.addEventListener('input', function () {
      targets.forEach((target) => {
        target.value = source.value;
      });
    });
  }

  // Unhide hidden input elements
  unhideElements('#tblvaksin input[type="hidden"]');
  unhideElements('#tblvaksin [style*="display:none"]');

  // Copy and paste vaccine dates
  copyPasteDates(
    document.getElementById('txttahunmslesdos1'),
    [
      document.getElementById('txttahunmumpsdos1'),
      document.getElementById('txttahunrblldos1'),
    ]
  );

  copyPasteDates(
    document.getElementById('txttahunmslesdos2'),
    [
      document.getElementById('txttahunmumpsdos2'),
      document.getElementById('txttahunrblldos2'),
    ]
  );

  // Enable all child elements within tblvaksin
  const tblvaksin = document.getElementById('tblvaksin');
  const elements = tblvaksin.getElementsByTagName('*');
  for (let k = 0; k < elements.length; k++) {
    elements[k].disabled = false;
  }

  // Define the number of iterations
  const numIterations = 3;

  for (let i = 1; i <= numIterations; i++) {
    const txttahundiftdos = document.getElementById('txttahundiftdos' + i);
    txttahundiftdos.addEventListener('change', function () {
      const value = this.value;
      const index = this.id.slice(-1);

      document.getElementById('txttahunhibdos' + index).value = value;
      document.getElementById('txttahunipvdos' + index).value = value;
      document.getElementById('txttahunptsisdos' + index).value = value;
      document.getElementById('txttahunttnusdos' + index).value = value;
    });
  }

  // Copy and paste vaccine dates for txttahundiftdostam
  document.getElementById('txttahundiftdostam').addEventListener('input', function () {
    const txttahundiftdostamValue = this.value;

    document.getElementById('txttahunptsisdostam').value = txttahundiftdostamValue;
    document.getElementById('txttahunttnusdostam').value = txttahundiftdostamValue;
    document.getElementById('txttahunhibdostam').value = txttahundiftdostamValue;
    document.getElementById('txttahunipvdostam').value = txttahundiftdostamValue;
  });

  // Check all checkboxes within tblvaksin
  const checkboxes = tblvaksin.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = true;
  });
})();
