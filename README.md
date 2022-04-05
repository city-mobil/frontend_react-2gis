# react-2gis

Реакт-обертка над WebGL-картами 2ГИС. (Используется ResizeObserver, подключите полифил, если это необходимо)

.npmrc
---

Необходимо создать файл `.npmrc`:

```bash
echo 'registry=${NpmProxyUrl}
tag-version-prefix=""
' >.npmrc
```

## Сборка

Для сборки библиотеки используется команда `yarn run build`

## Разработка

1. В директории библиотеки запускаем dev-сервер через `yarn run start`
2. Линкуем её: `yarn link`
3. Линкуем реакт: `cd node_modules/react && yarn link`
5. В директории таргет-проекта линкуем библиотеку и реакт (у нас должна быть одна копия): `yarn link "@city/react-2gis" && yarn link "react"`.

Для отката изменений можно использовать аналогичные команды с `unlink`.

## Storybook

Для запуска в режиме разработки запускаем `yarn storybook`
Для сборки `yarn build-storybook`

## Disclaimer

All information and source code are provided AS-IS, without express or implied warranties.
Use of the source code or parts of it is at your sole discretion and risk.
Citymobil LLC takes reasonable measures to ensure the relevance of the information posted in this repository, but it does not assume responsibility for maintaining or updating this repository or its parts outside the framework established by the company independently and without notifying third parties.

Вся информация и исходный код предоставляются в исходном виде, без явно выраженных или подразумеваемых гарантий. Использование исходного кода или его части осуществляются исключительно по вашему усмотрению и на ваш риск. Компания ООО "Ситимобил" принимает разумные меры для обеспечения актуальности информации, размещенной в данном репозитории, но она не принимает на себя ответственности за поддержку или актуализацию данного репозитория или его частей вне рамок, устанавливаемых компанией самостоятельно и без уведомления третьих лиц.
