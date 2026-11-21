# Exploratory Calibration Report: Actual Student Data vs. Monte Carlo Simulator

This report analyzes [`studentdata_anon.csv`](file:///Users/clintguymon/Agents/gradtime/studentdata_anon.csv) (45 anonymized students, 2,300 course enrollments) and compares actual student progressions against the current baseline Monte Carlo simulation in [`engine.ts`](file:///Users/clintguymon/Agents/gradtime/src/simulator/engine.ts) (`n = 250`).

> [!IMPORTANT]
> **Key Headline:** Among students who reached Senior Design (`CBE 451`, `n = 31`), **67.7%** graduate in $\le 8$ Fall/Winter semesters (avg **8.48** semesters). In contrast, the current simulator baseline predicts only **4.8%** graduating in $\le 8$ semesters (avg **9.80** semesters). The data points to **five concrete structural reasons** for this gap.

---

## 1. Cohort Completeness & Filtering

Before calibrating graduation metrics, we need to separate completed/graduating students from in-progress or early-exit transcripts:

| Cohort Segment | Students | Notes |
| --- | :---: | --- |
| **Graduating / Senior Cohort** (completed `CBE 451`) | **31** | All 31 also completed `CBE 436` and `CBE 476`; spans 6–11 Fall/Winter semesters. |
| **In-Progress / Incomplete** (no `CBE 451`, `436`, or `476`) | **14** | Includes 2 students with only 2 semesters, 2 with 5 semesters, and 10 mid-program students whose transcripts end before Senior year. |
| **Total in `studentdata_anon.csv`** | **45** | All 45 started in a **Fall** term. |

All graduation-time and course-timing comparisons below use the **31-student graduating cohort** so incomplete transcripts do not artificially lower the average.

---

## 2. Graduation Time: Actual vs. Current Simulator Baseline

| Metric | Actual Graduating Cohort (`n = 31`) | Current Simulator Baseline (`n = 250`) | Delta |
| --- | :---: | :---: | :---: |
| **Average Fall/Winter Semesters** | **8.48** | **9.80** | +1.32 sem |
| **Median Semesters** | **8** | **10** | +2 sem |
| **$\le 8$ Semester Graduation Rate** | **67.7%** (21/31) | **4.8%** (12/250) | −62.9 pp |
| **$\le 10$ Semester Graduation Rate** | **96.8%** (30/31) | **69.2%** (173/250) | −27.6 pp |

**Fall/Winter Semester Distribution:**

| Semesters | Actual (`n = 31`) | Simulated Baseline (`n = 250`) |
| :---: | :---: | :---: |
| **6** | 3.2% (1) | 0.0% (0) |
| **8** | **64.5% (20)** | 4.8% (12) |
| **9** | 12.9% (4) | **35.2% (88)** |
| **10** | 16.1% (5) | **29.2% (73)** |
| **11** | 3.2% (1) | 19.6% (49) |
| **12+** | 0.0% (0) | 11.2% (28) |

---

## 3. Root Cause #1: Incoming AP & Transfer Credits

The current simulator starts **100% of students with 0 completed credits**. In reality, the vast majority of CBE students enter with substantial AP or transfer credit, freeing up Freshman/Sophomore credit load and preventing early prerequisite delays:

| Foundational Course | Taken by Seniors (`n = 31`) | Skipped (AP / Transfer Proxy) |
| --- | :---: | :---: |
| `MATH 112` (Calc 1) | 7 / 31 | **77.4%** |
| `MATH 113` (Calc 2) | 15 / 31 | **51.6%** |
| `WRTG 150` | 9 / 31 | **71.0%** |
| `CHEM 105` / `111` (Gen Chem 1) | 17 / 31 | **45.2%** |
| `CHEM 106` / `112` (Gen Chem 2) | 21 / 31 | **32.3%** |
| `PHSCS 121` | 26 / 31 | **16.1%** |
| `ECON 110` | 28 / 31 | **9.7%** |
| `STAT 121` / `201` | 29 / 31 | **6.5%** |
| `WRTG 316` | 29 / 31 | **6.5%** |
| `UNIV 101` | 0 / 31 | **100.0%** *(newer requirement)* |

**Joint Calculus Entry Profile (Seniors):**
* **51.6%** (16/31) skipped **both** `MATH 112` and `MATH 113` (Calc BC / transfer).
* **25.8%** (8/31) skipped `MATH 112` only (Calc AB).
* Only **22.6%** (7/31) took both `MATH 112` and `MATH 113`.

---

## 4. Root Cause #2: Spring / Summer Enrollment

The current simulator baseline has `enableSpringSummer: false`. In the actual senior cohort, **74.2%** (23 of 31) took at least one Spring or Summer term:

* **Spring/Summer Terms per Senior:** 0 terms (25.8%), 1 term (19.4%), 2 terms (32.3%), 3 terms (12.9%), 4–5 terms (9.7%).
* **Average Load:** **1.94 courses** per Spring/Summer term taken.
* **What Students Actually Take in Spring/Summer:** Not just Gen Ed & Religion! Across all 45 students, Spring/Summer enrollments included:
  * **Gen Ed / Other:** 46 enrollments
  * **CBE Courses:** 24 enrollments — led by **`CBE 378`** (8), `CBE 199R` (5), `CBE 498R` (4), **`CBE 263`** (3)
  * **Religion:** 23 enrollments
  * **Math / Stat:** 23 enrollments — led by `MATH 213` (6), `MATH 334` (3), `MATH 113` (3), `STAT 201` (3), `STAT 121` (3)
  * **Chem / Phys & Other Eng:** `EC EN 301` (6), `CHEM`/`PHSCS` (12)

---

## 5. Root Cause #3: Core Course Timing & Elective Scheduling Mismatches

Comparing the average Fall/Winter semester when each core CBE course is taken reveals specific scheduling differences between real students and the simulator's priority rules:

| Course | Actual Avg Sem (`n = 31`) | Actual Med | Sim Avg Sem (`n = 250`) | Sim Med | Observation |
| --- | :---: | :---: | :---: | :---: | --- |
| `CBE 170` | 1.27 | 1.0 | 1.00 | 1.0 | Well aligned (Freshman Fall) |
| `CBE 191` | 1.79 | 1.0 | 1.98 | 1.0 | Well aligned |
| `CBE 263` | 2.67 | 3.0 | 3.39 | 3.0 | Real students take earlier (some in Soph/Spring) |
| `CBE 273` | 2.85 | 3.0 | 3.00 | 3.0 | Well aligned |
| `CBE 291` | 3.39 | 3.0 | 3.57 | 3.0 | Well aligned (after Year 1 restriction) |
| `CBE 311` | 4.19 | 4.0 | 4.00 | 4.0 | Well aligned |
| `CBE 374` | **4.06** | 4.0 | **4.78** | 4.0 | Sim pushes ~39% of students to Sem 6 (no AP Calc!) |
| `CBE 285` | **4.26** | 4.0 | **4.78** | 4.0 | Same downstream slip from `CBE 374` |
| `CBE 378` | 5.15 | 5.0 | 4.23 | 5.0 | Sim schedules earlier than real students |
| `CBE 386` | 5.23 | 5.0 | 5.00 | 5.0 | Well aligned |
| `CBE 345` | 5.27 | 5.0 | 5.00 | 5.0 | Well aligned |
| `CBE 391` | 5.68 | 5.0 | 5.91 | 6.0 | Well aligned (after Year 1–2 restriction) |
| `CBE 373` | **6.39** | **6.0** | **4.39** | **4.0** | **2.0 sem too early in sim** (real students take Junior Winter) |
| `CBE 376` | 6.37 | 6.0 | 6.78 | 6.0 | Downstream slip from `CBE 374` |
| `CBE 385` | 6.47 | 6.0 | 6.78 | 6.0 | Downstream slip from `CBE 374` |
| `CBE 436` | 7.42 | 7.0 | 7.78 | 7.0 | Downstream slip |
| `CBE 445` | 7.48 | 7.0 | 7.78 | 7.0 | Downstream slip |
| `CBE 476` | 7.48 | 7.0 | 7.78 | 7.0 | Downstream slip |
| `CBE 451` | 8.48 | 8.0 | 8.78 | 8.0 | Close, **but sim doesn't graduate students here!** |
| `CBE 461` | **8.45** | **8.0** | **10.08** | **10.0** | **1.63 sem too late in sim** — electives get starved! |

> [!WARNING]
> **Why Simulated Graduation (9.80) Lags Behind `CBE 451` (8.78) by a Full Semester:**
> In the simulator, `Eng`, `EMSB`, and `EPSEL` electives have the lowest priority weight (`30` vs. `45–55` for Rel/Gen and `100+` for Major). Combined with zero AP credit and no Spring/Summer, students finish `CBE 451` in Semester 8–9 but still have leftover **EMSB**, **Eng**, and **EPSEL (`CBE 461`)** credits pushing graduation to Semesters 9–12!

---

## 6. Additional Real-World Dynamics Captured in the CSV

### A. Stop-Outs / Gaps (Missions, Co-ops, Internships)
* **42.2%** of students (19/45) had a Fall/Winter gap.
* Gap lengths: 1 sem (3), 2 sem (1), 3 sem (5), **4 sem (8 — typical 2-year mission)**, 5 sem (2).
* **52.6% of gaps** (10/19) had an **odd** number of missed semesters, which flips Fall/Winter parity upon return and directly interacts with once-a-year CBE offerings.

### B. Academic Retakes / Repeats (DFW Proxy)
Excluding repeatable `-R` courses and `SWELL` PE classes, **33.3% of students (15/45)** repeated at least one academic course. The simulator currently assumes a **0% retake rate**.
* Most frequently repeated courses: **`CBE 376`** (5), **`CHEM 467`** (5), **`ECON 110`** (4), **`CBE 273`** (4), **`MATH 113`** (4), `CHEM 357` (3), `STAT 201` (3), `WRTG 316` (3), `CBE 263` (2), `CBE 373` (2), `CBE 378` (2).

### C. Curriculum Substitutions & Math Sequences
Real transcripts reflect common course substitutions that differ from the single canonical course in `classdetails.csv`:
* **Math Sequence:** Only **12 of 31 seniors** took `MATH 302/303`; **19 of 31** took the traditional sequence (`MATH 213`, `215`, `314`, `334`).
* **Chemistry:** Most students took `CHEM 111/112` (20–21) over `CHEM 105/106` (8–12), `CHEM 357` (39) over `CHEM 351` (3), and `CHEM 467` (39) over `CHEM 464` (2).
* **Statistics:** `STAT 201` (31) was far more common than `STAT 121` (8).
* **EPSEL:** `CBE 461` (22) is the dominant capstone, followed by `CBE 495R` (6) and `CBE 499` (2).

---

## 7. Recommended Calibration Roadmap

To bring the Monte Carlo simulator into close alignment with actual historical outcomes while keeping it useful for What-If experiments, here are the highest-leverage next steps in priority order:

1. **Add Empirical Incoming AP / Transfer Credit Profiles** (`engine.ts` + optional toggle in `InterventionsTab.tsx`):
   Sample starting completed credits (Calc AB/BC, `WRTG 150`, Gen Chem 1/2, `PHSCS 121`) using the empirical probabilities above. This alone will close most of the `CBE 374` slip and 8-semester graduation gap.
2. **Make Spring/Summer Enrollment Probabilistic in Baseline**:
   Instead of 0% (off) vs. 100% (all students every year), model the empirical ~74% participation rate (averaging ~1–2 Spring/Summer terms per student, ~2 courses/term) and allow Spring/Summer offerings for courses actually taken then (e.g., `CBE 378`, `CBE 263`, `EC EN 301`, `MATH`, `STAT`).
3. **Add Empirical Retake Probabilities & Optional Stop-Out Parity Flips**:
   Add realistic per-course retake rates (e.g., ~5–12% on `CBE 273`, `CBE 376`, `CHEM 467`, `MATH 113`) and an optional toggle for mission/co-op parity flips so the simulator captures the right tail (9–11 semester graduations) for the *right* reasons rather than credit starvation.
4. **Fix `CBE 373` & Elective Scheduling Priority**:
   Check why `CBE 373` is taken in Semester 4 in the sim vs. Semester 6 in reality (missing prereq or year standing?), and ensure `CBE 461`/EPSEL and Eng/EMSB electives aren't starved behind `CBE 451`.
5. **Add an "Actual Historical Cohort (n = 31)" Overlay to the Dashboard**:
   Plot the actual graduation semester histogram right alongside the Baseline and Experiment bars in [`DashboardTab.tsx`](file:///Users/clintguymon/Agents/gradtime/src/components/DashboardTab.tsx) so you can visually verify model fit at any time.
