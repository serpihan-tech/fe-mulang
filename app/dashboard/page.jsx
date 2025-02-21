"use client";
import React, { Component } from "react";
import Chart from "react-apexcharts";
import { CalendarDays } from "lucide-react";
import Card from "./_component/Card";
import { Users } from "lucide-react";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']
        }
      },
      series: [
        {
          name: "Hadir",
          data: [140, 130, 140, 130, 130]
        },
        {
          name: "Tidak Hadil",
          data: [20, 30, 20, 20, 30]
        }
      ]
    };
  }

  render() {
    return (
      <>
        <div className=" bg-[#FAFAFA]">
          <div className="flex pt-8 px-6 gap-5">
            <div>
              <div className="flex gap-5">
                <Card>
                  <Users className="w-9 h-9 bg-blue-600 p-1.5 rounded-md text-white text-extrabold"/>
                  <p className="text-lg font-bold py-4">1025</p>
                  <p className="text-sm font-medium" >Total Siswa</p>
                </Card>
                <Card>
                  <Users className="w-9 h-9 bg-blue-600 p-1.5 rounded-md text-white text-extrabold"/>
                  <p className="text-lg font-bold py-4">100</p>
                  <p className="text-sm font-medium" >Total Guru</p>
                </Card>
                <Card>
                  <Users className="w-9 h-9 bg-blue-600 p-1.5 rounded-md text-white text-extrabold"/>
                  <p className="text-lg font-bold py-4">150</p>
                  <p className="text-sm font-medium" >Total Mapel</p>
                </Card>
                <Card>
                  <Users className="w-9 h-9 bg-blue-600 p-1.5 rounded-md text-white text-extrabold"/>
                  <p className="text-lg font-bold py-4">25000</p>
                  <p className="text-sm font-medium" >Total Kelulusan</p>
                </Card>
              </div>
              <div className="mt-5 bg-white px-5 py-4 rounded-md">
                <p className="text-lg font-bold">Kehadiran</p>
                <div className="mixed-chart">
                  <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="line"
                    width="700"
                  />
                </div>
              </div>
              <div className="mt-5 bg-white px-5 py-4 rounded-md">
                <p className="text-lg font-bold">Pusat Informasi</p>
              </div>
            </div>
            
            <div>
              <div className="w-[332px] h-16 flex p-3.5 rounded-md bg-white gap-5">
                <div className="flex items-center">
                  <CalendarDays className="flex items-center justify-center w-7.5 rounded-md text-gray-700 text-extrabold "/>
                </div>
                <div>
                  <p className="text-base font-bold">Periode</p>
                  <p className="text-[10px] font-medium" >Genap 2024-2025</p>
                </div>
              </div>
              <div className="w-[332px] h-16 p-3.5 mt-[27px] rounded-md bg-white gap-5">
                <div>
                  <p className="text-lg font-bold">Kalender</p>
                </div>
                <div>
                  <p className="text-base font-medium text-[#333333]">Upcoming Event</p>
                </div>
              </div>
            </div>
          </div>
        </div>  
      </>
    );
  }
}