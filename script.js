document.addEventListener('DOMContentLoaded', function() {
    // عناصر DOM
    const cvUploadBox = document.getElementById('cv-upload');
    const jdUploadBox = document.getElementById('jd-upload');
    const cvFileInput = document.getElementById('cv-file');
    const jdFileInput = document.getElementById('jd-file');
    const cvFileInfo = document.getElementById('cv-file-info');
    const jdFileInfo = document.getElementById('jd-file-info');
    const analyzeBtn = document.getElementById('analyze-btn');
    const resultIcon = document.getElementById('result-icon');
    const resultText = document.getElementById('result-text');
    const resultScore = document.getElementById('result-score');
    const analysisDetails = document.getElementById('analysis-details');
    const resultBox = document.getElementById('result-box');

    // متغيرات لحالة الملفات
    let cvFile = null;
    let jdFile = null;

    // أحداث سحب وإسقاط الملفات
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        cvUploadBox.addEventListener(eventName, preventDefaults, false);
        jdUploadBox.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        cvUploadBox.addEventListener(eventName, highlight, false);
        jdUploadBox.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        cvUploadBox.addEventListener(eventName, unhighlight, false);
        jdUploadBox.addEventListener(eventName, unhighlight, false);
    });

    cvUploadBox.addEventListener('drop', handleDropCV, false);
    jdUploadBox.addEventListener('drop', handleDropJD, false);

    // أحداث اختيار الملفات
    cvFileInput.addEventListener('change', handleCVFileSelect);
    jdFileInput.addEventListener('change', handleJDFileSelect);

    // زر التحليل
    analyzeBtn.addEventListener('click', analyzeDocuments);

    // وظائف مساعدة
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(e) {
        this.style.borderColor = '#3498db';
        this.style.backgroundColor = '#f0f8ff';
    }

    function unhighlight(e) {
        this.style.borderColor = '#ddd';
        this.style.backgroundColor = '#fff';
    }

    function handleDropCV(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0 && (files[0].type === 'application/pdf' || files[0].name.endsWith('.docx'))) {
            cvFile = files[0];
            cvFileInfo.textContent = cvFile.name;
            checkFilesReady();
        }
    }

    function handleDropJD(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0 && (files[0].type === 'application/pdf' || files[0].name.endsWith('.docx') || files[0].type === 'text/plain'))) {
            jdFile = files[0];
            jdFileInfo.textContent = jdFile.name;
            checkFilesReady();
        }
    }

    function handleCVFileSelect(e) {
        const files = e.target.files;
        if (files.length > 0 && (files[0].type === 'application/pdf' || files[0].name.endsWith('.docx'))) {
            cvFile = files[0];
            cvFileInfo.textContent = cvFile.name;
            checkFilesReady();
        }
    }

    function handleJDFileSelect(e) {
        const files = e.target.files;
        if (files.length > 0 && (files[0].type === 'application/pdf' || files[0].name.endsWith('.docx') || files[0].type === 'text/plain'))) {
            jdFile = files[0];
            jdFileInfo.textContent = jdFile.name;
            checkFilesReady();
        }
    }

    function checkFilesReady() {
        if (cvFile && jdFile) {
            analyzeBtn.disabled = false;
        } else {
            analyzeBtn.disabled = true;
        }
    }

    // وظيفة التحليل الرئيسية
    async function analyzeDocuments() {
        // عرض حالة التحميل
        resultIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        resultText.textContent = 'جاري التحليل...';
        resultScore.textContent = '';
        analysisDetails.innerHTML = '';
        resultBox.className = 'result-box';
        analyzeBtn.disabled = true;
        analyzeBtn.textContent = 'جاري المعالجة...';

        try {
            // محاكاة تحميل الملفات ومعالجتها (في الواقع سيكون لديك اتصال بالخادم أو API)
            // هنا نستخدم setTimeout لمحاكاة عملية غير متزامنة
            setTimeout(() => {
                // هذه نتيجة وهمية لأغراض العرض التوضيحي
                // في التطبيق الحقيقي، ستقوم بإرسال الملفات إلى الخادم أو API لمعالجتها
                
                // نتيجة عشوائية لأغراض العرض التوضيحي (50% قبول، 50% رفض)
                const isAccepted = Math.random() > 0.5;
                const score = Math.floor(Math.random() * 40) + 60; // درجة بين 60 و100

                if (isAccepted) {
                    resultIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
                    resultText.textContent = 'مقبول';
                    resultScore.textContent = `الدرجة: ${score}/100`;
                    resultBox.classList.add('accepted');
                    
                    analysisDetails.innerHTML = `
                        <p><strong>تحليل السيرة الذاتية:</strong></p>
                        <ul>
                            <li>تطابق المهارات: ${Math.floor(Math.random() * 20) + 80}%</li>
                            <li>تطابق الخبرة: ${Math.floor(Math.random() * 20) + 70}%</li>
                            <li>تطابق التعليم: ${Math.floor(Math.random() * 20) + 90}%</li>
                            <li>الكلمات المفتاحية المتطابقة: ${Math.floor(Math.random() * 5) + 8} من 10</li>
                        </ul>
                        <p><strong>ملاحظات:</strong></p>
                        <p>السيرة الذاتية جيدة وتحتوي على معظم المتطلبات الأساسية للوظيفة. هناك تطابق جيد في المهارات والخبرات.</p>
                    `;
                } else {
                    resultIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
                    resultText.textContent = 'مرفوض';
                    resultScore.textContent = `الدرجة: ${score}/100`;
                    resultBox.classList.add('rejected');
                    
                    analysisDetails.innerHTML = `
                        <p><strong>تحليل السيرة الذاتية:</strong></p>
                        <ul>
                            <li>تطابق المهارات: ${Math.floor(Math.random() * 30) + 40}%</li>
                            <li>تطابق الخبرة: ${Math.floor(Math.random() * 30) + 30}%</li>
                            <li>تطابق التعليم: ${Math.floor(Math.random() * 30) + 50}%</li>
                            <li>الكلمات المفتاحية المتطابقة: ${Math.floor(Math.random() * 3) + 2} من 10</li>
                        </ul>
                        <p><strong>ملاحظات:</strong></p>
                        <p>السيرة الذاتية لا تفي بالمتطلبات الأساسية للوظيفة. ينصح بإضافة المزيد من الخبرات ذات الصلة وتحسين الكلمات المفتاحية.</p>
                    `;
                }
                
                analyzeBtn.disabled = false;
                analyzeBtn.textContent = 'ابدأ التحليل';
            }, 3000);
        } catch (error) {
            console.error('Error analyzing documents:', error);
            resultIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
            resultText.textContent = 'خطأ في التحليل';
            resultScore.textContent = '';
            analysisDetails.innerHTML = '<p>حدث خطأ أثناء معالجة الملفات. يرجى المحاولة مرة أخرى.</p>';
            resultBox.className = 'result-box';
            analyzeBtn.disabled = false;
            analyzeBtn.textContent = 'ابدأ التحليل';
        }
    }

    // ملاحظة: في التطبيق الحقيقي، ستحتاج إلى:
    // 1. إرسال الملفات إلى الخادم لاستخراج النص
    // 2. استخدام API مثل OpenAI لتحليل النص
    // 3. مقارنة السيرة الذاتية مع وصف الوظيفة
    // 4. إرجاع النتائج إلى الواجهة الأمامية
});async function analyzeWithAI(cvText, jdText) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are an ATS (Applicant Tracking System) expert. Analyze the CV against the job description and provide a matching score and detailed feedback in Arabic."
                },
                {
                    role: "user",
                    content: `Job Description: ${jdText}\n\nCV: ${cvText}\n\nPlease analyze and provide:
                    1. Matching score (0-100)
                    2. Key skills match
                    3. Experience match
                    4. Education match
                    5. Keywords match
                    6. Detailed feedback in Arabic`
                }
            ]
        })
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
          }
