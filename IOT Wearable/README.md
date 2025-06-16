# ⌚ IoT-Based Smart Watch for Women Safety

This module presents a **proposed wearable safety system** — a **smart watch** that monitors biometric and motion patterns in real time and triggers alerts in potentially dangerous situations using machine learning.

---

## 🧠 Concept Overview

The smart watch is designed to:

- Continuously monitor **biometrics** and **motion data** using embedded sensors.
- Analyze data patterns locally or through the connected app using a **machine learning model**.
- If **irregular behavior** is detected (e.g., increased heart rate, panic motion), trigger a **20-second countdown alert**.
- The user can **cancel or confirm the alert** within this window.
- Upon confirmation or no response, it **sends SOS alerts** using **GPS** and **GSM** modules.

---

## 🔧 Features

| Feature                  | Description                                                                 |
|--------------------------|-----------------------------------------------------------------------------|
| Sensor Monitoring      | Heart rate, motion, temperature, etc.                                      |
| ML-Based Analysis      | Data sent to the Her Guardian App where an ML model evaluates irregularity |
| GPS + GSM Alerting     | Real-time location sharing and emergency alerts to trusted contacts         |
| ⏱20s Alert Window       | Gives the user control before emergency is triggered                        |
| Context-Aware Alerts   | Uses heatmap data from Her Guardian app to assess environmental risk       |

---

## Prototype Overview

The system is currently in **prototype phase**, and the simulation logic is implemented in:

- `watch.ipynb` – Jupyter Notebook demonstrating end-to-end logic flow using simulated data streams and ML classification.

## ScreenShots
<p float="Left">
<img src="assets/img/img (1).png" width="227" />
<img src="assets/img/img (2).png" width="200" />
<img src="assets/img/img (3).png" width="200" />
<img src="assets/img/img (4).png" width="400" />
<img src="assets/img/img (5).png" width="400" />
</p>

---

## 🔗 Figma Interface Prototy

View the interactive UI design here:

[🔗 Figma Link to Smart Watch UI](https://www.figma.com/proto/tA3YHueqTjiqPXAOg3zqI4/Untitled?node-id=2-8&p=f&t=RV9uDQXslZBMwrHR-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A8)

> *This design mockup demonstrates how alerts and biometric data will be shown on the wearable display.*

---

## ⚙️ Detection Parameters

The ML model detects risk based on:

- **Biometric changes** (e.g., heart rate spikes)
- **Motion anomalies** (e.g., shaking, falling, abnormal accelerometer data)
- **Time & Location sensitivity**, based on:
  - Heatmap of past incidents from **Her Guardian App**
  - Geographical danger zones derived from real-time or historical alerts

---

## 🧩 Integration with Her Guardian App

- Data from the smart watch is sent to the mobile app.
- The ML model (trained on collected biometric + movement data) runs inference.
- If high-risk patterns are identified, app triggers visual + audible alert and logs the event.

---

## 👥 Contributors

- **Sushil Kumar Patra** – Project Lead 
---

> ⚠️ *This is a prototype under development. Real-time testing on hardware is a future goal. All alerts and ML decisions are currently simulated using real-world assumptions.*

