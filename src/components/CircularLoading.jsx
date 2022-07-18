import * as React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import '../scss/CircularLoading.scss'

export default function CircularIndeterminate() {
    const { promiseInProgress } = usePromiseTracker();
    console.log("promiseInProgress"+promiseInProgress);
    if (promiseInProgress) {
        return (
            <div className='loading-cover'>
                <div className='loading-zone rotate-center'>
                    <div className='loading-icon'>
                    </div>
                </div>
            </div>
        );
    }

}