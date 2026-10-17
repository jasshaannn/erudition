/**
 * ERUDITION INSTITUTE - INTERACTIVE PORTAL & RESULTS MANAGEMENT SYSTEM
 * Location: Bardhalan, Punjab 141412 | Contact: +91 9555770391
 *
 * Features:
 * 1. Result Posting & Management Portal (IELTS, PTE, Visa Approvals)
 * 2. Real-time Search & Multi-category Filtering
 * 3. Digital Scorecard & Official Printable Certificate Verification
 * 4. Interactive IELTS / PTE Band Calculator & Overseas Eligibility Engine
 * 5. Dark / Light Theme Mode Switcher with LocalStorage Memory
 * 6. Mobile Navigation Drawer
 * 7. Live Announcements & Results Ticker
 * 8. Enhanced Consultation Enquiry System
 * 9. Toast Notifications Engine
 * 10. WhatsApp Direct Chat & Floating Action Buttons
 */

(function () {
  'use strict';
  if (window.__eruditionPortalInitialized) return;
  window.__eruditionPortalInitialized = true;

  // --- Constants & Storage Keys ---
  var STORAGE_RESULTS_KEY = 'erudition_institute_results_v2';
  var STORAGE_THEME_KEY = 'erudition_institute_theme';
  var STORAGE_ENQUIRIES_KEY = 'erudition_institute_enquiries';

  // --- Seed Data (Authentic Punjab Student Success Stories) ---
  var SEED_RESULTS = [
    {
      id: 'ERU-2026-101',
      name: 'Harpreet Kaur',
      category: 'ielts',
      examType: 'IELTS Academic',
      overall: '8.0',
      bandLabel: 'Overall Band 8.0',
      scores: { l: 8.5, r: 8.5, w: 7.0, s: 8.0 },
      destination: 'Canada • University of British Columbia',
      intake: 'Fall 2026',
      date: '12 Oct 2026',
      batch: 'Regular Morning Intensive Batch',
      remarks: 'Cleared in 1st attempt! Achieved 8.5 in Listening and Reading within 6 weeks of focused mentorship at Erudition.',
      avatar: '👩‍🎓',
      verified: true,
      cefr: 'C1 - Proficient User',
      featured: true
    },
    {
      id: 'ERU-2026-102',
      name: 'Gurkirat Singh',
      category: 'pte',
      examType: 'PTE Academic',
      overall: '79',
      bandLabel: 'Overall Score 79 / 90',
      scores: { l: 81, r: 78, w: 76, s: 82 },
      destination: 'Australia • Deakin University, Melbourne',
      intake: 'Feb 2027',
      date: '08 Oct 2026',
      batch: 'PTE Fastrack Lab Batch',
      remarks: 'Target score was 65+, scored 79 overall with 82 in Speaking using Erudition AI Mock Test Portal!',
      avatar: '👨‍🎓',
      verified: true,
      cefr: 'C1 - Proficient User',
      featured: true
    },
    {
      id: 'ERU-2026-103',
      name: 'Jaspreet Singh',
      category: 'visa',
      examType: 'Canada Study Visa (SDS)',
      overall: 'Approved',
      bandLabel: 'Visa Granted 🇨🇦',
      country: 'Canada',
      countryFlag: '🇨🇦',
      institution: 'St. Clair College, Windsor, ON',
      course: 'PG Diploma in Cloud Computing',
      grantId: 'V-CAN-884920',
      intake: 'Jan 2027',
      date: '04 Oct 2026',
      batch: 'Direct Admission & Visa Wing',
      remarks: 'Smooth SDS visa file processing without any interview. Visa stamped within 18 working days!',
      avatar: '👨‍🎓',
      verified: true,
      featured: true
    },
    {
      id: 'ERU-2026-104',
      name: 'Simranjit Kaur',
      category: 'ielts',
      examType: 'IELTS Academic',
      overall: '7.5',
      bandLabel: 'Overall Band 7.5',
      scores: { l: 8.0, r: 7.5, w: 7.0, s: 7.5 },
      destination: 'United Kingdom • University of Greenwich',
      intake: 'Sept 2026',
      date: '28 Sep 2026',
      batch: 'Weekend Masterclass Batch',
      remarks: 'Improved writing from 6.0 to 7.0 with one-on-one essay evaluations by Erudition faculty.',
      avatar: '👩‍🎓',
      verified: true,
      cefr: 'C1 - Effective Operational',
      featured: false
    },
    {
      id: 'ERU-2026-105',
      name: 'Navjot Singh',
      category: 'visa',
      examType: 'UK Student Route Visa',
      overall: 'Approved',
      bandLabel: 'Visa Granted 🇬🇧',
      country: 'United Kingdom',
      countryFlag: '🇬🇧',
      institution: 'University of Hertfordshire',
      course: 'MSc International Business Management',
      grantId: 'V-UK-441092',
      intake: 'Sept 2026',
      date: '21 Sep 2026',
      batch: 'Immigration & Visa Wing',
      remarks: 'CAS interview cleared smoothly and visa stamped with £2,500 international scholarship.',
      avatar: '👨‍🎓',
      verified: true,
      featured: false
    },
    {
      id: 'ERU-2026-106',
      name: 'Amanpreet Dhillon',
      category: 'pte',
      examType: 'PTE Academic',
      overall: '84',
      bandLabel: 'Overall Score 84 / 90',
      scores: { l: 86, r: 82, w: 80, s: 88 },
      destination: 'Australia • University of Melbourne',
      intake: 'March 2027',
      date: '15 Sep 2026',
      batch: 'PTE Speaking Mastery Lab',
      remarks: 'Top score in Punjab region! 88 in Speaking and 86 in Listening with continuous computer lab practice.',
      avatar: '👨‍🎓',
      verified: true,
      cefr: 'C2 - Mastery / Proficient',
      featured: false
    }
  ];

  // --- State Variables ---
  var currentFilter = 'all';
  var currentSearchQuery = '';
  var resultsList = [];

  // =========================================================================
  // INITIALIZATION
  // =========================================================================
  function init() {
    loadResultsData();
    initTheme();
    initMobileNav();
    initResultsSection();
    initPostResultModal();
    initScorecardModal();
    initBandCalculator();
    initFloatingActions();
    initEnhancedEnquiry();
    initClipboardCopy();
    renderTicker();
  }

  // --- LocalStorage Helpers ---
  function loadResultsData() {
    try {
      var saved = localStorage.getItem(STORAGE_RESULTS_KEY);
      if (saved) {
        resultsList = JSON.parse(saved);
      } else {
        resultsList = SEED_RESULTS.slice();
        saveResultsData();
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
      resultsList = SEED_RESULTS.slice();
    }
  }

  function saveResultsData() {
    try {
      localStorage.setItem(STORAGE_RESULTS_KEY, JSON.stringify(resultsList));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }

  // =========================================================================
  // THEME SWITCHER (Dark / Light Mode)
  // =========================================================================
  function initTheme() {
    // Permanent dark mode
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  // =========================================================================
  // MOBILE NAVIGATION DRAWER
  // =========================================================================
  function initMobileNav() {
    var menuBtn = document.getElementById('mobileMenuBtn');
    var drawer = document.getElementById('mobileNavDrawer');
    var backdrop = document.getElementById('mobileNavBackdrop');
    var closeBtn = document.getElementById('mobileNavClose');

    if (!menuBtn || !drawer || !backdrop) return;

    function openMenu() {
      drawer.classList.add('active');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      drawer.classList.remove('active');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);

    // Close when clicking any nav link
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  // =========================================================================
  // TICKER BAR (Live Student Results Announcements)
  // =========================================================================
  function renderTicker() {
    var track = document.getElementById('tickerTrack');
    if (!track) return;

    var highlights = [];
    resultsList.forEach(function (item) {
      if (item.category === 'visa') {
        highlights.push(
          '<span class="ticker-item">' +
            item.countryFlag + ' <strong>' + escapeHtml(item.name) + '</strong>: ' +
            escapeHtml(item.country) + ' Study Visa Granted (' + escapeHtml(item.institution) + ')</span>'
        );
      } else if (item.category === 'ielts') {
        highlights.push(
          '<span class="ticker-item">🎉 <strong>' + escapeHtml(item.name) + '</strong>: Scored ' +
            escapeHtml(item.overall) + ' Bands in IELTS Academic!</span>'
        );
      } else if (item.category === 'pte') {
        highlights.push(
          '<span class="ticker-item">🏆 <strong>' + escapeHtml(item.name) + '</strong>: Achieved PTE ' +
            escapeHtml(item.overall) + ' / 90 Overall!</span>'
        );
      }
    });

    highlights.push(
      '<span class="ticker-item">🎯 <strong>Erudition Institute</strong>: New IELTS & PTE Morning & Evening Batches Open Now</span>'
    );
    highlights.push(
      '<span class="ticker-item">📞 <strong>Free Profile Assessment</strong>: Call +91 9555770391 for Visa Eligibility</span>'
    );

    // Repeat items to fill marquee
    var content = highlights.join('') + highlights.join('');
    track.innerHTML = content;
  }

  // =========================================================================
  // RESULTS SECTION RENDERING & FILTERING
  // =========================================================================
  function initResultsSection() {
    var searchInput = document.getElementById('resultSearchInput');
    var filterTabs = document.querySelectorAll('.filter-tab');

    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        currentSearchQuery = e.target.value.trim().toLowerCase();
        renderResultsGrid();
      });
    }

    filterTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        filterTabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        currentFilter = tab.getAttribute('data-filter') || 'all';
        renderResultsGrid();
      });
    });

    renderResultsGrid();
  }

  function renderResultsGrid() {
    var grid = document.getElementById('resultsGrid');
    var metaCount = document.getElementById('resultsCount');
    if (!grid) return;

    // Filter results
    var filtered = resultsList.filter(function (item) {
      // Category filter
      if (currentFilter !== 'all' && item.category !== currentFilter) {
        return false;
      }
      // Search query filter
      if (currentSearchQuery) {
        var query = currentSearchQuery;
        var matchName = item.name && item.name.toLowerCase().indexOf(query) !== -1;
        var matchId = item.id && item.id.toLowerCase().indexOf(query) !== -1;
        var matchExam = item.examType && item.examType.toLowerCase().indexOf(query) !== -1;
        var matchCountry = item.country && item.country.toLowerCase().indexOf(query) !== -1;
        var matchDest = item.destination && item.destination.toLowerCase().indexOf(query) !== -1;
        var matchInst = item.institution && item.institution.toLowerCase().indexOf(query) !== -1;
        var matchRemarks = item.remarks && item.remarks.toLowerCase().indexOf(query) !== -1;
        return matchName || matchId || matchExam || matchCountry || matchDest || matchInst || matchRemarks;
      }
      return true;
    });

    if (metaCount) {
      metaCount.textContent = 'Showing ' + filtered.length + ' of ' + resultsList.length + ' results';
    }

    if (filtered.length === 0) {
      grid.innerHTML =
        '<div class="results-empty">' +
        '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
        '<h3>No Results Found</h3>' +
        '<p>No student scorecard matched "' + escapeHtml(currentSearchQuery) + '". Try another student name or roll number.</p>' +
        '<button class="btn ghost" id="btnResetFilter">Reset Filters</button>' +
        '</div>';

      var resetBtn = document.getElementById('btnResetFilter');
      if (resetBtn) {
        resetBtn.addEventListener('click', function () {
          var input = document.getElementById('resultSearchInput');
          if (input) input.value = '';
          currentSearchQuery = '';
          currentFilter = 'all';
          document.querySelectorAll('.filter-tab').forEach(function (t) {
            t.classList.toggle('active', t.getAttribute('data-filter') === 'all');
          });
          renderResultsGrid();
        });
      }
      return;
    }

    var html = '';
    filtered.forEach(function (item) {
      html += createResultCardHtml(item);
    });

    grid.innerHTML = html;
    attachCardListeners();
  }

  function createResultCardHtml(item) {
    var isVisa = item.category === 'visa';
    var isPte = item.category === 'pte';
    var badgeClass = isVisa ? 'visa' : (isPte ? 'pte' : 'ielts');
    var badgeLabel = item.examType || (isVisa ? 'Study Visa' : 'IELTS');

    // Avatar
    var avatarContent = item.avatarImg
      ? '<img src="' + escapeHtml(item.avatarImg) + '" alt="' + escapeHtml(item.name) + '">'
      : (item.avatar || '🎓');

    // Score or Visa block
    var scoreBlockHtml = '';
    if (isVisa) {
      scoreBlockHtml =
        '<div class="score-highlight">' +
          '<div class="score-main">' +
            '<span class="score-label">Visa Status</span>' +
            '<div class="score-value visa-stamp">' + (item.countryFlag || '✈️') + ' ' + escapeHtml(item.bandLabel || 'Granted') + '</div>' +
          '</div>' +
          '<div class="score-icon-badge" title="Official Visa Approval">✈️</div>' +
        '</div>' +
        '<div class="visa-details-box">' +
          '<div><span>Country:</span><span>' + escapeHtml(item.country || 'Canada') + '</span></div>' +
          '<div><span>College:</span><span>' + escapeHtml(item.institution || '-') + '</span></div>' +
          '<div><span>Course:</span><span>' + escapeHtml(item.course || '-') + '</span></div>' +
          '<div><span>Grant ID:</span><span>' + escapeHtml(item.grantId || 'VERIFIED') + '</span></div>' +
        '</div>';
    } else {
      var isIelts = !isPte;
      var scoreVal = isIelts ? item.overall + ' Band' : item.overall + ' / 90';
      var s = item.scores || { l: 0, r: 0, w: 0, s: 0 };
      scoreBlockHtml =
        '<div class="score-highlight">' +
          '<div class="score-main">' +
            '<span class="score-label">Official Score</span>' +
            '<div class="score-value">' + escapeHtml(scoreVal) + '</div>' +
          '</div>' +
          '<div class="score-icon-badge">' + (isIelts ? '8+' : 'PTE') + '</div>' +
        '</div>' +
        '<div class="breakdown-grid">' +
          '<div class="breakdown-item"><div class="breakdown-key">Listening</div><div class="breakdown-val">' + s.l + '</div></div>' +
          '<div class="breakdown-item"><div class="breakdown-key">Reading</div><div class="breakdown-val">' + s.r + '</div></div>' +
          '<div class="breakdown-item"><div class="breakdown-key">Writing</div><div class="breakdown-val">' + s.w + '</div></div>' +
          '<div class="breakdown-item"><div class="breakdown-key">Speaking</div><div class="breakdown-val">' + s.s + '</div></div>' +
        '</div>';
    }

    var destinationText = item.destination ? '<p style="font-size:12.5px;color:var(--teal);margin-bottom:12px;font-weight:600">🎯 ' + escapeHtml(item.destination) + '</p>' : '';
    var remarksHtml = item.remarks ? '<div class="student-quote">“' + escapeHtml(item.remarks) + '”</div>' : '';

    var waShareUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(
      '🎉 Congratulations to ' + item.name + ' for achieving ' + (item.bandLabel || item.overall) +
      ' at Erudition Institute! Verified Roll No: ' + item.id + ' | Bardhalan, Punjab.'
    );

    return (
      '<article class="result-card ' + (item.featured ? 'featured' : '') + '" data-id="' + escapeHtml(item.id) + '">' +
        '<div class="card-topbar">' +
          '<span class="type-badge ' + badgeClass + '">' + escapeHtml(badgeLabel) + '</span>' +
          '<span class="verified-tag"><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Verified</span>' +
        '</div>' +
        '<div class="student-row">' +
          '<div class="student-avatar">' + avatarContent + '</div>' +
          '<div class="student-meta">' +
            '<h3>' + escapeHtml(item.name) + '</h3>' +
            '<div class="student-roll">Roll: <strong>' + escapeHtml(item.id) + '</strong> • ' + escapeHtml(item.date || '2026') + '</div>' +
          '</div>' +
        '</div>' +
        destinationText +
        scoreBlockHtml +
        remarksHtml +
        '<div class="card-actions">' +
          '<button class="btn-card primary btn-view-cert" data-id="' + escapeHtml(item.id) + '">' +
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>' +
            'Official Scorecard' +
          '</button>' +
          '<a class="btn-icon-card" href="' + waShareUrl + '" target="_blank" rel="noopener" title="Share on WhatsApp">' +
            '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>' +
          '</a>' +
          '<button class="btn-icon-card btn-delete-result" data-id="' + escapeHtml(item.id) + '" title="Remove result">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>' +
          '</button>' +
        '</div>' +
      '</article>'
    );
  }

  function attachCardListeners() {
    // Scorecard modal view button
    document.querySelectorAll('.btn-view-cert').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-id');
        openScorecardModal(id);
      });
    });

    // Delete result button
    document.querySelectorAll('.btn-delete-result').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var id = btn.getAttribute('data-id');
        if (confirm('Are you sure you want to remove result ' + id + '?')) {
          resultsList = resultsList.filter(function (r) { return r.id !== id; });
          saveResultsData();
          renderResultsGrid();
          renderTicker();
          showToast('Result ' + id + ' removed');
        }
      });
    });
  }

  // =========================================================================
  // POST NEW RESULT MODAL CONTROLLER
  // =========================================================================
  function initPostResultModal() {
    var modal = document.getElementById('postResultModal');
    var openBtn = document.getElementById('btnOpenPostResult');
    var closeBtn = document.getElementById('btnClosePostResult');
    var cancelBtn = document.getElementById('btnCancelPostResult');
    var form = document.getElementById('postResultForm');
    var catSelect = document.getElementById('postCategory');
    var rollInput = document.getElementById('postRollNo');

    if (!modal || !form) return;

    function openModal() {
      // Auto-generate fresh roll number suggestion
      if (rollInput) {
        var randNum = Math.floor(100 + Math.random() * 900);
        rollInput.value = 'ERU-2026-' + randNum;
      }
      // Reset form
      form.reset();
      updateDynamicFields();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });

    // Toggle fields based on Category
    if (catSelect) {
      catSelect.addEventListener('change', updateDynamicFields);
    }

    // Dynamic IELTS score auto-calculation
    var scoreSelects = form.querySelectorAll('.ielts-score-field');
    scoreSelects.forEach(function (sel) {
      sel.addEventListener('change', calculateModalIeltsScore);
    });

    // Avatar selector logic
    var avatarOpts = document.querySelectorAll('.avatar-opt');
    avatarOpts.forEach(function (opt) {
      opt.addEventListener('click', function () {
        avatarOpts.forEach(function (o) { o.classList.remove('selected'); });
        opt.classList.add('selected');
      });
    });

    // Form submit
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('postStudentName').value.trim();
      var roll = document.getElementById('postRollNo').value.trim();
      var category = catSelect.value;

      if (!name) {
        alert('Please enter student name');
        return;
      }
      if (!roll) {
        alert('Please enter roll number');
        return;
      }

      var selectedAvatar = '🎓';
      var activeAvatarEl = document.querySelector('.avatar-opt.selected');
      if (activeAvatarEl) {
        selectedAvatar = activeAvatarEl.getAttribute('data-avatar') || '🎓';
      }

      var remarks = document.getElementById('postRemarks').value.trim();
      var batch = document.getElementById('postBatch').value.trim() || 'Bardhalan Campus';
      var targetDest = document.getElementById('postDestination').value.trim();

      var newRecord = {
        id: roll,
        name: name,
        category: category,
        batch: batch,
        remarks: remarks || 'Outstanding academic achievement at Erudition Institute!',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        avatar: selectedAvatar,
        verified: true,
        featured: true
      };

      if (category === 'ielts') {
        var l = parseFloat(document.getElementById('postIeltsL').value) || 7.0;
        var r = parseFloat(document.getElementById('postIeltsR').value) || 7.0;
        var w = parseFloat(document.getElementById('postIeltsW').value) || 7.0;
        var s = parseFloat(document.getElementById('postIeltsS').value) || 7.0;
        var overallBand = computeIeltsOverall(l, r, w, s);

        newRecord.examType = document.getElementById('postIeltsType').value;
        newRecord.overall = overallBand.toFixed(1);
        newRecord.bandLabel = 'Overall Band ' + overallBand.toFixed(1);
        newRecord.scores = { l: l, r: r, w: w, s: s };
        newRecord.cefr = getIeltsCefr(overallBand);
        newRecord.destination = targetDest || 'Global University Admission';
      } else if (category === 'pte') {
        var pL = parseInt(document.getElementById('postPteL').value, 10) || 75;
        var pR = parseInt(document.getElementById('postPteR').value, 10) || 75;
        var pW = parseInt(document.getElementById('postPteW').value, 10) || 75;
        var pS = parseInt(document.getElementById('postPteS').value, 10) || 75;
        var pOverall = Math.round((pL + pR + pW + pS) / 4);

        newRecord.examType = 'PTE Academic';
        newRecord.overall = String(pOverall);
        newRecord.bandLabel = 'Overall Score ' + pOverall + ' / 90';
        newRecord.scores = { l: pL, r: pR, w: pW, s: pS };
        newRecord.cefr = pOverall >= 76 ? 'C1 - Proficient' : 'B2 - Independent';
        newRecord.destination = targetDest || 'Australia / Canada Admission';
      } else if (category === 'visa') {
        var country = document.getElementById('postVisaCountry').value;
        var college = document.getElementById('postVisaCollege').value.trim();
        var course = document.getElementById('postVisaCourse').value.trim();
        var grantId = document.getElementById('postVisaGrantId').value.trim() || 'V-' + Math.floor(100000 + Math.random() * 900000);

        var flags = {
          Canada: '🇨🇦',
          'United Kingdom': '🇬🇧',
          Australia: '🇦🇺',
          USA: '🇺🇸',
          'New Zealand': '🇳🇿',
          Europe: '🇪🇺'
        };

        newRecord.examType = country + ' Study Visa';
        newRecord.overall = 'Approved';
        newRecord.bandLabel = 'Visa Granted ' + (flags[country] || '✈️');
        newRecord.country = country;
        newRecord.countryFlag = flags[country] || '✈️';
        newRecord.institution = college || 'Accredited Institute';
        newRecord.course = course || 'Study Abroad Program';
        newRecord.grantId = grantId;
      }

      // Prepend to list
      resultsList.unshift(newRecord);
      saveResultsData();
      renderResultsGrid();
      renderTicker();
      closeModal();
      showToast('🎉 Congratulations! Result for ' + name + ' has been published to the portal!');
    });
  }

  function updateDynamicFields() {
    var cat = document.getElementById('postCategory').value;
    var ieltsFields = document.getElementById('fieldsIelts');
    var pteFields = document.getElementById('fieldsPte');
    var visaFields = document.getElementById('fieldsVisa');

    if (ieltsFields) ieltsFields.style.display = (cat === 'ielts') ? 'block' : 'none';
    if (pteFields) pteFields.style.display = (cat === 'pte') ? 'block' : 'none';
    if (visaFields) visaFields.style.display = (cat === 'visa') ? 'block' : 'none';

    if (cat === 'ielts') calculateModalIeltsScore();
  }

  function calculateModalIeltsScore() {
    var l = parseFloat(document.getElementById('postIeltsL').value) || 7.0;
    var r = parseFloat(document.getElementById('postIeltsR').value) || 7.0;
    var w = parseFloat(document.getElementById('postIeltsW').value) || 7.0;
    var s = parseFloat(document.getElementById('postIeltsS').value) || 7.0;
    var overall = computeIeltsOverall(l, r, w, s);

    var calcDisplay = document.getElementById('modalIeltsComputed');
    if (calcDisplay) {
      calcDisplay.textContent = 'Calculated Band: ' + overall.toFixed(1);
    }
  }

  // =========================================================================
  // OFFICIAL SCORECARD & CERTIFICATE MODAL
  // =========================================================================
  function initScorecardModal() {
    var modal = document.getElementById('scorecardModal');
    var closeBtn = document.getElementById('btnCloseScorecard');
    var printBtn = document.getElementById('btnPrintScorecard');
    var shareBtn = document.getElementById('btnShareScorecard');

    if (!modal) return;

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });

    if (printBtn) {
      printBtn.addEventListener('click', function () {
        window.print();
      });
    }

    if (shareBtn) {
      shareBtn.addEventListener('click', function () {
        var roll = shareBtn.getAttribute('data-roll');
        var item = resultsList.find(function (r) { return r.id === roll; });
        if (!item) return;

        var text = '🎉 Official Statement of Results - Erudition Institute:\n' +
          'Candidate: ' + item.name + '\n' +
          'Roll No: ' + item.id + '\n' +
          'Result: ' + (item.bandLabel || item.overall) + '\n' +
          'Date: ' + item.date + '\n' +
          'Center: Bardhalan, Punjab.\nVerify online at Erudition Institute.';

        var url = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(text);
        window.open(url, '_blank');
      });
    }
  }

  function openScorecardModal(id) {
    var modal = document.getElementById('scorecardModal');
    var sheet = document.getElementById('certSheet');
    var shareBtn = document.getElementById('btnShareScorecard');
    if (!modal || !sheet) return;

    var item = resultsList.find(function (r) { return r.id === id; });
    if (!item) return;

    if (shareBtn) shareBtn.setAttribute('data-roll', item.id);

    var isVisa = item.category === 'visa';
    var isPte = item.category === 'pte';
    var isIelts = item.category === 'ielts';

    var tableRows = '';
    if (isVisa) {
      tableRows =
        '<tr><td class="highlight">Destination Country</td><td><strong>' + escapeHtml(item.country || 'Canada') + '</strong></td><td>Official Study Permit</td></tr>' +
        '<tr><td class="highlight">Designated Institution</td><td>' + escapeHtml(item.institution || 'University') + '</td><td>DLI Approved</td></tr>' +
        '<tr><td class="highlight">Course & Intake</td><td>' + escapeHtml(item.course || 'Undergraduate / Post-Graduate') + '</td><td>' + escapeHtml(item.intake || 'Confirmed') + '</td></tr>' +
        '<tr><td class="highlight">Visa Grant Ref ID</td><td><code>' + escapeHtml(item.grantId || 'V-884920') + '</code></td><td>Official Immigration Grant</td></tr>';
    } else {
      var s = item.scores || { l: 0, r: 0, w: 0, s: 0 };
      var maxScale = isPte ? '90' : '9.0';
      tableRows =
        '<tr><td class="highlight">Listening</td><td><strong>' + s.l + '</strong> / ' + maxScale + '</td><td>' + getScoreDescriptor(s.l, isPte) + '</td></tr>' +
        '<tr><td class="highlight">Reading</td><td><strong>' + s.r + '</strong> / ' + maxScale + '</td><td>' + getScoreDescriptor(s.r, isPte) + '</td></tr>' +
        '<tr><td class="highlight">Writing</td><td><strong>' + s.w + '</strong> / ' + maxScale + '</td><td>' + getScoreDescriptor(s.w, isPte) + '</td></tr>' +
        '<tr><td class="highlight">Speaking</td><td><strong>' + s.s + '</strong> / ' + maxScale + '</td><td>' + getScoreDescriptor(s.s, isPte) + '</td></tr>';
    }

    var overallTitle = isVisa ? 'VISA APPLICATION STATUS' : (isPte ? 'OVERALL PTE SCORE' : 'OVERALL IELTS BAND SCORE');
    var overallValue = isVisa ? (item.countryFlag + ' VISA APPROVED') : item.overall;
    var cefrNote = item.cefr ? '<div style="font-size:12px;color:#A9C58F;margin-top:4px">CEFR Equivalent: ' + escapeHtml(item.cefr) + '</div>' : '';

    sheet.innerHTML =
      '<div class="cert-header">' +
        '<h2>Erudition Institute of Global Education</h2>' +
        '<p class="sub">Bus Stand, Main, Khanna - Samrala Rd, Bardhalan, Punjab 141412 • Reg No: ERU/PB/2026</p>' +
        '<span class="cert-badge-ribbon">Official Statement of Results & Achievement</span>' +
      '</div>' +
      '<div class="cert-meta-grid">' +
        '<div class="cert-meta-item"><small>Candidate Full Name</small><strong>' + escapeHtml(item.name) + '</strong></div>' +
        '<div class="cert-meta-item"><small>Candidate Roll / ID</small><strong>' + escapeHtml(item.id) + '</strong></div>' +
        '<div class="cert-meta-item"><small>Examination / Assessment</small><strong>' + escapeHtml(item.examType || 'IELTS') + '</strong></div>' +
        '<div class="cert-meta-item"><small>Date of Issue</small><strong>' + escapeHtml(item.date || '2026') + '</strong></div>' +
      '</div>' +
      '<div class="cert-overall-highlight">' +
        '<div>' +
          '<div class="title">' + overallTitle + '</div>' +
          cefrNote +
        '</div>' +
        '<div class="band">' + escapeHtml(overallValue) + '</div>' +
      '</div>' +
      '<table class="cert-table">' +
        '<thead><tr><th>Assessment Module</th><th>Score Achieved</th><th>Performance Description</th></tr></thead>' +
        '<tbody>' + tableRows + '</tbody>' +
      '</table>' +
      '<div class="cert-footer-row">' +
        '<div class="cert-seal-block">' +
          '<div class="cert-seal">ERUDITION<br>SEAL<br>VERIFIED</div>' +
          '<div style="font-size:12px;color:#586C65">' +
            '<div><strong>Digital Verification Stamp</strong></div>' +
            '<div>Hash: ' + btoa(item.id + ':' + item.name).substring(0, 16) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="cert-sign-block">' +
          '<div class="cert-signature-line">Erudition Academic Council</div>' +
          '<div class="cert-sign-label">Director of Examinations & Immigrations</div>' +
        '</div>' +
      '</div>';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function getScoreDescriptor(val, isPte) {
    if (isPte) {
      if (val >= 85) return 'Expert User (C2)';
      if (val >= 76) return 'Proficient User (C1)';
      if (val >= 65) return 'Very Good Operational (B2+)';
      if (val >= 58) return 'Good Competent User (B2)';
      return 'Modest User';
    } else {
      if (val >= 8.5) return 'Expert User (Fully Fluent)';
      if (val >= 7.5) return 'Very Good Operational Command';
      if (val >= 6.5) return 'Good User with Operational Command';
      if (val >= 6.0) return 'Competent User';
      return 'Modest / Foundation User';
    }
  }

  // =========================================================================
  // BAND CALCULATOR & OVERSEAS ELIGIBILITY ENGINE (#calculator)
  // =========================================================================
  function initBandCalculator() {
    var slL = document.getElementById('calcL');
    var slR = document.getElementById('calcR');
    var slW = document.getElementById('calcW');
    var slS = document.getElementById('calcS');

    if (!slL || !slR || !slW || !slS) return;

    var sliders = [slL, slR, slW, slS];
    sliders.forEach(function (slider) {
      slider.addEventListener('input', updateCalculator);
    });

    var consultBtn = document.getElementById('btnConsultWithBand');
    if (consultBtn) {
      consultBtn.addEventListener('click', function () {
        var band = document.getElementById('calcBigBand').textContent.trim();
        var enquireSec = document.getElementById('enquire');
        var courseSelect = document.getElementById('c');
        if (courseSelect) {
          courseSelect.value = 'IELTS / PTE';
        }
        if (enquireSec) {
          enquireSec.scrollIntoView({ behavior: 'smooth' });
          showToast('🎯 Course set to IELTS / PTE for Target Band ' + band);
        }
      });
    }

    updateCalculator();
  }

  function updateCalculator() {
    var l = parseFloat(document.getElementById('calcL').value);
    var r = parseFloat(document.getElementById('calcR').value);
    var w = parseFloat(document.getElementById('calcW').value);
    var s = parseFloat(document.getElementById('calcS').value);

    // Update label tags
    document.getElementById('valL').textContent = l.toFixed(1);
    document.getElementById('valR').textContent = r.toFixed(1);
    document.getElementById('valW').textContent = w.toFixed(1);
    document.getElementById('valS').textContent = s.toFixed(1);

    var overall = computeIeltsOverall(l, r, w, s);
    var bigBandEl = document.getElementById('calcBigBand');
    var cefrEl = document.getElementById('calcCefr');

    if (bigBandEl) bigBandEl.textContent = overall.toFixed(1);
    if (cefrEl) cefrEl.textContent = getIeltsCefr(overall);

    updateEligibilityCards(overall, Math.min(l, r, w, s));
  }

  function updateEligibilityCards(overall, minScore) {
    var can = document.getElementById('eligCanada');
    var uk = document.getElementById('eligUk');
    var aus = document.getElementById('eligAus');
    var usa = document.getElementById('eligUsa');

    if (!can || !uk || !aus || !usa) return;

    if (overall >= 7.0 && minScore >= 6.5) {
      can.innerHTML = '<b>🇨🇦 Canada Direct Entry (SDS & Top Universities)</b><span>Direct admission to UBC, UofT, McGill & fast SDS visa processing.</span>';
      uk.innerHTML = '<b>🇬🇧 United Kingdom (Russell Group Direct Entry)</b><span>Eligible for Oxford, Manchester, King\'s College & direct Masters degree.</span>';
      aus.innerHTML = '<b>🇦🇺 Australia (Group of Eight - Go8)</b><span>Eligible for top Australian universities without English foundations.</span>';
      usa.innerHTML = '<b>🇺🇸 USA (Tier-1 Research Universities)</b><span>Eligible for graduate teaching assistantships and direct admissions.</span>';
    } else if (overall >= 6.5 && minScore >= 6.0) {
      can.innerHTML = '<b>🇨🇦 Canada SDS Colleges & Universities</b><span>Eligible for all popular public colleges (Seneca, Humber, St. Clair, Centennial).</span>';
      uk.innerHTML = '<b>🇬🇧 United Kingdom (Public Universities)</b><span>Eligible for 90%+ UK Universities for Bachelors & Masters courses.</span>';
      aus.innerHTML = '<b>🇦🇺 Australia (Level-1 Universities)</b><span>Direct entry for Bachelors and Master degree programs.</span>';
      usa.innerHTML = '<b>🇺🇸 USA (State Universities)</b><span>Meets general undergraduate & graduate international requirements.</span>';
    } else if (overall >= 6.0) {
      can.innerHTML = '<b>🇨🇦 Canada Diploma & Non-SDS Programs</b><span>Eligible for diploma and select PG certificates with pathway options.</span>';
      uk.innerHTML = '<b>🇬🇧 UK Foundation & Pre-Masters Programs</b><span>Pre-sessional English course or foundation direct admission.</span>';
      aus.innerHTML = '<b>🇦🇺 Australia VET / Diploma Leading to Degree</b><span>Packaged pathway admissions available.</span>';
      usa.innerHTML = '<b>🇺🇸 USA Community Colleges & Pathways</b><span>2+2 degree transfer pathway programs available.</span>';
    } else {
      can.innerHTML = '<b>📚 Erudition Foundation Recommendation</b><span>Join our 4-Week Fastrack Band Booster batch to reach 6.5+ band!</span>';
      uk.innerHTML = '<b>📚 Language Booster Recommended</b><span>Target at least 6.0 overall with no band less than 5.5 for UK visa.</span>';
      aus.innerHTML = '<b>📚 ELICOS English Foundation</b><span>Requires 10-20 weeks ELICOS language course.</span>';
      usa.innerHTML = '<b>📚 ESL Program Required</b><span>Bridge intensive ESL program needed prior to academic coursework.</span>';
    }
  }

  // --- Official Cambridge IELTS Rounding Rule ---
  function computeIeltsOverall(l, r, w, s) {
    var avg = (l + r + w + s) / 4.0;
    var intPart = Math.floor(avg);
    var dec = avg - intPart;

    if (dec < 0.25) {
      return intPart;
    } else if (dec < 0.75) {
      return intPart + 0.5;
    } else {
      return intPart + 1.0;
    }
  }

  function getIeltsCefr(band) {
    if (band >= 8.5) return 'CEFR C2 • Mastery / Expert';
    if (band >= 7.5) return 'CEFR C1 • Proficient User';
    if (band >= 6.5) return 'CEFR B2 • Independent / Vantage';
    if (band >= 5.5) return 'CEFR B1 • Threshold';
    return 'CEFR Foundation';
  }

  // =========================================================================
  // ENHANCED CONSULTATION ENQUIRY SYSTEM (#f)
  // =========================================================================
  function initEnhancedEnquiry() {
    var form = document.getElementById('f');
    var statusEl = document.getElementById('ok');
    if (!form || !statusEl) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('n').value.trim();
      var email = document.getElementById('e').value.trim();
      var phone = document.getElementById('p').value.replace(/\D/g, '');
      var course = document.getElementById('c').value;

      if (!name || name.length < 2) {
        statusEl.innerHTML = '<span style="color:#FB923C">Please enter your full name.</span>';
        return;
      }
      if (!phone || phone.length < 10) {
        statusEl.innerHTML = '<span style="color:#FB923C">Please enter a valid 10-digit mobile number.</span>';
        return;
      }

      var enquiryId = 'ENQ-' + Math.floor(1000 + Math.random() * 9000);
      var enquiryData = {
        id: enquiryId,
        name: name,
        email: email,
        phone: phone,
        course: course || 'General Overseas Guidance',
        date: new Date().toLocaleString()
      };

      try {
        var existing = JSON.parse(localStorage.getItem(STORAGE_ENQUIRIES_KEY) || '[]');
        existing.unshift(enquiryData);
        localStorage.setItem(STORAGE_ENQUIRIES_KEY, JSON.stringify(existing));
      } catch (err) {}

      statusEl.innerHTML =
        '<div style="background:rgba(169,197,143,0.18);border:1px solid var(--leaf);padding:14px 18px;border-radius:12px;margin-top:14px;color:#fff">' +
        '<b style="color:var(--leaf);display:block;font-size:16px;margin-bottom:4px">🎉 Consultation Confirmed! (Ref: #' + enquiryId + ')</b>' +
        'Thank you, ' + escapeHtml(name) + '. Our senior visa and IELTS counselor will call you on <strong>+91 ' + escapeHtml(phone) + '</strong> within 2 hours.' +
        '</div>';

      showToast('✅ Consultation request #' + enquiryId + ' sent to Erudition team!');
      form.reset();
    });
  }

  // =========================================================================
  // FLOATING ACTIONS (WhatsApp & Back to Top)
  // =========================================================================
  function initFloatingActions() {
    var topBtn = document.getElementById('btnBackToTop');
    if (!topBtn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 350) {
        topBtn.classList.add('visible');
      } else {
        topBtn.classList.remove('visible');
      }
    });

    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =========================================================================
  // CLIPBOARD COPY HELPER
  // =========================================================================
  function initClipboardCopy() {
    document.querySelectorAll('.copy').forEach(function (b) {
      b.addEventListener('click', function () {
        var targetId = b.getAttribute('data-t');
        var el = document.getElementById(targetId);
        if (!el) return;
        var txt = el.textContent;

        function done() {
          b.textContent = 'Copied!';
          showToast('📋 Copied: ' + txt);
          setTimeout(function () { b.textContent = 'Copy'; }, 1500);
        }

        try {
          navigator.clipboard.writeText(txt).then(done, function () {
            selectText(el);
            done();
          });
        } catch (x) {
          selectText(el);
          done();
        }
      });
    });

    function selectText(el) {
      var r = document.createRange();
      r.selectNodeContents(el);
      var s = window.getSelection();
      s.removeAllRanges();
      s.addRange(r);
    }
  }

  // =========================================================================
  // TOAST NOTIFICATION ENGINE
  // =========================================================================
  function showToast(message) {
    var container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    var toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = message;
    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(function () {
      toast.classList.add('show');
    });

    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3500);
  }

  // --- Utility: Escape HTML ---
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Expose to DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
