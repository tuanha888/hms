
import {v4 as uuidv4} from 'uuid'
export const getPatientAPI = () => {
    return {
        id: uuidv4(),
        name: 'Bệnh nhân A',
        address: 'Địa chỉ A',
        birthday: new Date(),
        job: 'Nghề nghiệp A',
        phoneNumber: '0123456789',
        nation: 'Quốc tịch A',
        gender: 'Nam',
    }
}