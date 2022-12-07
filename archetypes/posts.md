---
title: "{{ replace .TranslationBaseName "-" " " | title }}"
url: "/{{ replace .TranslationBaseName "-" " " | urlize }}/"
date: "{{ .Date }}"
showLastUpdated: false
highlightCode: true
---
