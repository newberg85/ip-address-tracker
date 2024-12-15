"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import arrow from "../images/icon-arrow.svg";
import background from "../images/pattern-bg-desktop.png";
// import { Map } from "@/components/Map";

import dynamic from 'next/dynamic';

// Carregar o componente Map apenas no cliente (desabilitando SSR)
const Map = dynamic(() => import('@/components/Map').then((mod) => mod.Map), { ssr: false });


interface LocationData {
  city: string;
  region: string;
  timezone: string;
  lat: number;
  lng: number;
}

interface AddressData {
  ip: string;
  location: LocationData;
  isp: string;
}

export default function Home() {
  const [address, setAddress] = useState<AddressData | null>(null);
  const [ipAddress, setIpAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getInitialData = async () => {
      setLoading(true);
      try {
        const apikey = process.env.NEXT_PUBLIC_API_KEY;
        console.log(apikey)
        const response = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${apikey}`
        );
        const data = await response.json();
        setAddress(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getInitialData();
  }, []);

  async function searchIp(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const apikey = process.env.NEXT_PUBLIC_API_KEY;
      console.log(apikey)
      const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${apikey}&ipAddress=${ipAddress}`
      );
      const data = await response.json();
      setAddress(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const ip = loading ? "Loading..." : address?.ip;
  const locationRegion = loading ? "Loading..." : address?.location?.region;
  const locationCity = loading ? "Loading..." : address?.location?.city;
  const timezone = loading ? "Loading..." : address?.location?.timezone;
  const isp = loading ? "Loading..." : address?.isp;

  return (
    <>
      <section className="overflow-x-hidden">
        <div className="absolute -z-10 w-full">
          <Image
            src={background}
            alt="bg-image"
            className="w-full h-80 object-cover"
          />
        </div>
        <article className="p-8">
          <h1 className="text-2xl lg:text-3xl text-center text-white font-bold mb-8">
            IP Address Tracker
          </h1>

          <form
            onSubmit={searchIp}
            className="flex justify-center max-w-xl mx-auto"
          >
            <input
              type="text"
              name="ipaddress"
              id="ipaddress"
              placeholder="Search for any Ip Address or domain"
              required
              className="py-2 px-4 rounded-l-lg w-full"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
            />
            <button
              type="submit"
              className="bg-black py-4 px-4 hover:opacity-60 rounded-r-lg"
            >
              <Image src={arrow} alt="arrowIcon" />
            </button>
          </form>
        </article>

        <article
          className="bg-white rounded-lg shadow p-8 mx-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl xl:mx-auto text-center md:text-left -mb-80 lg:-mb-16 md:-mb-20 sm:-mb-60 relative"
          style={{ zIndex: 10000 }}
        >
          <div className="lg:border-r lg:border-slate-400">
            <h2 className="uppercase text-sm font-bold text-slate-500 tracking-wider mb-3">
              Ip Address
            </h2>
            <p className="font-semibold text-slate-900 text-lg md:text-2xl xl:text-2xl">
              {ip}
            </p>
          </div>

          <div className="lg:border-r lg:border-slate-400">
            <h2 className="uppercase text-sm font-bold text-slate-500 tracking-wider mb-3">
              Location
            </h2>
            <p className="font-semibold text-slate-900 text-lg md:text-2xl xl:text-2xl">
              {locationRegion}, {locationCity}
            </p>
          </div>

          <div className="lg:border-r lg:border-slate-400">
            <h2 className="uppercase text-sm font-bold text-slate-500 tracking-wider mb-3">
              Timezone
            </h2>
            <p className="font-semibold text-slate-900 text-lg md:text-2xl xl:text-2xl">
              UTC{timezone}
            </p>
          </div>

          <div className="">
            <h2 className="uppercase text-sm font-bold text-slate-500 tracking-wider mb-3">
              ISP
            </h2>
            <p className="font-semibold text-slate-900 text-lg md:text-2xl xl:text-2xl">
              {isp}
            </p>
          </div>
        </article>

        <Map
          // address={
          //   address
          //     ? {
          //         location: address.location,
          //       }
          //     : null
          // }

          address={address?.location ? { location: address.location } : null}
          
        />
      </section>
    </>
  );
}
