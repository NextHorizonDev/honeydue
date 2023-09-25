import { isNil } from 'lodash';

export const AttendeeStatus = {
    INVITED: 'invited',
    ACCEPTED: 'accepted',
    REJECTED: 'rejected',
    REVOKED: 'revoked',
    NONE: 'none'
};

export const AttendanceType = {
    USER: 'user',
    EMAIL: 'email'
};

export const AttendanceStatus = {
    PENDING: 'pending',
    INVITED: 'invited',
    ACCEPTED: 'accepted',
    REJECTED: 'rejected'
};

export const AttendanceChangeStatus = {
    ADD: 'add',
    REMOVE: 'remove'
};

export const isVisibleAttendance = (attendance) => {
    if (isNil(attendance)) {
        return false;
    }
    return attendance.status === AttendeeStatus.INVITED || attendance.status === AttendeeStatus.ACCEPTED || attendance.status === AttendeeStatus.REJECTED;
};
