# Diopong Primary School

Responsive school website with a bilingual learning hub for Grades R–7.

## Files

- `dist/*.html`: Home, Our school, For parents, Learning hub, Contact and Privacy pages.
- `dist/styles.css`: responsive styles and animated mobile sidebar.
- `dist/script.js`: navigation and parent checklist.
- `dist/bilingual-activities.js`: 160 activities in English and Sepedi, 20 per grade.
- `dist/bilingual-hub.js`: grade, language and subject filters; worksheet and answer downloads.
- `dist/grade-activities.js` and `dist/learning.js`: additional English practice and quizzes.
- `.github/workflows/deploy-pages.yml`: automatic deployment on pushes to main.

## Update the website

Edit the appropriate file within `dist/`, then commit to `main`. No dependencies or build step are required. Review GitHub Actions to confirm deployment.

## Configure hosting

In Settings → Pages, choose GitHub Actions as the source. Set the custom domain to `diopong.lefamalatji.co.za`. The domain-provider CNAME for `diopong` should point to `lefa-2329.github.io`. Enable HTTPS once GitHub provisions the certificate. Leave the portfolio root and www records unchanged.

## Content

Learning activities are supplementary practice, not official assessments or a complete curriculum. Sepedi translations await fluent teacher review. No learner photographs, accounts, identity documents or records are included. School notices and operational details require school approval.
