

export const getMedicalRecords = () => {
    let medicals = []
    for (let i=0; i<5; ++i) 
    {
        medicals.push({
            doctorId: "doc001",
            doctorName: "Dr. John Doe",
            patientId: "pat001",
            patientName: "Alice Smith",
            departmentId: "dept001",
            departmentName: "Cardiology",
            BHYTCode: "BHYT123",
            inDay: new Date("2022-01-01"),
            outDay: new Date("2022-01-10"),
            inDayDiagnose: "Fever",
            outDayDiagnose: "Recovered",
            medicalHistory: "No significant history",
            diseaseProgress: "Stable",
            testResults: "Normal",
            hospitalDischargeStatus: "Discharged",
            stayType: "Inpatient",
            note: "Patient responded well to treatment.",
            treatmentPlan: null
        })
    }
    return medicals
}