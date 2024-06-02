import React from 'react'
import CombinedChart from '../Combinedchart'
import { RiMoneyRupeeCircleLine } from 'react-icons/ri'
import { TbDeviceAnalytics } from 'react-icons/tb'

const Home = () => {
    return (
        <>
            <div className='mb-0 flex flex-col items-center'>
                <div className="mt-19 flex justify-center items-center h-290 w-540">
                    <CombinedChart />
                </div> 
                <div className='text-3xl text-white font-bold flex flex-row space-x-20 justify-between'>
    <div className="relative hover:shadow-xl">
        <div className="bg-gradient-to-r from-slate-900 to-gray-700 space-y-8 mb-0 border rounded-lg p-6 h-64 w-96 border-inherit cursor-pointer transition-transform duration-300 hover:scale-110 ">
            <RiMoneyRupeeCircleLine />
            <div className="text-4xl text-white font-bold mb-2">Purchases</div>
            <div className="absolute bottom-20 left-0 w-full border-b-2 border-white"></div> {/* Line underneath */}
            <div className="absolute bottom-6 left-6 text-white">Total Amount: 46,000</div> {/* Total amount */}
        </div>
    </div>
    <div className="relative">
        <div className="bg-gradient-to-r from-slate-900 to-gray-700 space-y-8 mb-0 border rounded-lg shadow-lg p-6 h-64 w-96 border-inherit cursor-pointer transition-transform duration-300 hover:scale-110 ">
            <TbDeviceAnalytics />
            <div className="text-4xl text-white font-bold mb-2">Sales</div>
            <div className="absolute bottom-20 left-0 w-full border-b-2 border-white"></div> {/* Line underneath */}
            <div className="absolute bottom-6 left-6 text-white">Total Amount: 50,000</div> {/* Total amount */}
        </div>
    </div>
</div>
            </div>
        </>

    )
}

export default Home
