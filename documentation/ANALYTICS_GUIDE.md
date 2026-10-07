# NEXORA Analytics Specification Guide

## 1. Mathematical & Academic Formulas

### Total Marks
$$\text{Total Marks} = \sum_{i=1}^{n} \text{SubjectMark}_i$$

### Average Mark / Cumulative GPA
$$\text{Average} = \frac{\text{Total Marks}}{n}$$

### Passing Condition
$$\text{Result} = \begin{cases} \text{PASS} & \text{if } \text{Average} \ge 40 \land \forall s \in \text{Subjects} (s \ge 35) \land \text{Attendance} \ge 75\% \\ \text{FAIL} & \text{otherwise} \end{cases}$$

### Grade Thresholds
- **A+**: $90\% - 100\%$
- **A**: $80\% - 89\%$
- **B**: $70\% - 79\%$
- **C**: $60\% - 69\%$
- **D**: $50\% - 59\%$
- **E**: $40\% - 49\%$
- **F**: Below $40\%$

---

## 2. Performance Status Tiers
- **EXCELLENT**: $\text{Average} \ge 85 \land \text{Attendance} \ge 90\%$
- **GOOD**: $\text{Average} \ge 70 \land \text{Attendance} \ge 80\%$
- **NEEDS IMPROVEMENT**: $\text{Average} \ge 50 \land \text{Attendance} \ge 75\%$
- **AT RISK**: $\text{Average} < 50 \lor \text{Attendance} < 75\%$

---

## 3. Risk Diagnostic Rules
1. **Critical Risk**:
   - Any individual subject score $< 35$ (Failed subject benchmark)
   - Attendance $< 65\%$ (Severe deficit)
   - Cumulative average $< 40\%$
2. **High Risk**:
   - Any individual subject score $< 50$
   - Attendance between $65\% - 74\%$
   - Cumulative average between $40\% - 49\%$
3. **Moderate Risk**:
   - Cumulative average between $50\% - 69\%$
   - Attendance between $75\% - 79\%$
4. **Safe**:
   - Cumulative average $\ge 70\%$, Attendance $\ge 80\%$, all subject scores $\ge 60$.
