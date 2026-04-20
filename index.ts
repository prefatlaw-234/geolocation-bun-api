/// <reference types="bun-types" />
import { open } from "maxmind"; 

const lookup = await open("./GeoLite2-City.mmdb");

Bun.serve({
  port: 3000,
  fetch(req, server) {
    const ip = server.requestIP(req)?.address || "8.8.8.8"; 
    
    const city = lookup.get(ip);

    return Response.json({
      success: true,
      ip: ip,
      data: city
    });
  },
});