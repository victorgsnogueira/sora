# 📏 Limites de Caracteres no Discord

Este documento lista **todos os limites oficiais de caracteres** para mensagens, embeds e seus componentes no Discord.

> ⚠️ Os valores abaixo refletem os limites atuais usados pela API do Discord e pelo cliente oficial.

---

## 💬 Mensagens Normais

| Item              | Limite               |
| ----------------- | -------------------- |
| Mensagem de texto | **2.000 caracteres** |

---

## 🧩 Embeds (Visão Geral)

| Item                          | Limite    |
| ----------------------------- | --------- |
| Total de caracteres por embed | **6.000** |
| Embeds por mensagem           | **10**    |

> O limite de **6.000 caracteres** é a soma de **todos os campos do embed**.

---

## 🏷️ Embed — Componentes Individuais

| Componente    | Limite                            |
| ------------- | --------------------------------- |
| `title`       | **256 caracteres**                |
| `description` | **4.096 caracteres**              |
| `url`         | Sem limite explícito (URL válida) |
| `color`       | Valor inteiro (RGB)               |

---

## 📦 Embed — Author

| Campo             | Limite             |
| ----------------- | ------------------ |
| `author.name`     | **256 caracteres** |
| `author.icon_url` | URL válida         |
| `author.url`      | URL válida         |

---

## 🖼️ Embed — Images & Media

| Campo           | Limite     |
| --------------- | ---------- |
| `thumbnail.url` | URL válida |
| `image.url`     | URL válida |
| `video.url`     | URL válida |

> O Discord controla tamanho e formato das imagens, não o número de caracteres.

---

## 🧱 Embed — Fields

| Regra                   | Limite               |
| ----------------------- | -------------------- |
| Número máximo de fields | **25**               |
| `field.name`            | **256 caracteres**   |
| `field.value`           | **1.024 caracteres** |
| `field.inline`          | Boolean              |

---

## 🦶 Embed — Footer

| Campo             | Limite               |
| ----------------- | -------------------- |
| `footer.text`     | **2.048 caracteres** |
| `footer.icon_url` | URL válida           |

---

## ⏱️ Embed — Timestamp

| Campo       | Limite                  |
| ----------- | ----------------------- |
| `timestamp` | ISO 8601 ou UNIX válido |

---

## 🧮 Resumo Rápido (Importante)

* 📌 Mensagem normal: **2.000 caracteres**
* 📦 Embed total: **6.000 caracteres**
* 🧱 Máx. fields: **25**
* 📝 Description: **4.096**
* 🦶 Footer: **2.048**
* 🏷️ Title: **256**

---

## 🛠️ Observações Técnicas

* Se qualquer limite for ultrapassado, a API do Discord **rejeita a mensagem**
* Bots **não recebem truncamento automático**
* O limite total de 6.000 caracteres **soma todos os campos do embed**

---

📚 Referência útil para bots, webhooks e integrações com a API do Discord.
