import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import '../scss/CircularLoading.scss';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

export default function CircularIndeterminate() {
    const { promiseInProgress } = usePromiseTracker();
    return (
        promiseInProgress && (
            <div className='loading-cover'>
                <div className='loading-zone rotate-center'>
                    <div className='loading-icon'>
                    </div>
                </div>
            </div>
        )
    );
}