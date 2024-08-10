import express, { Application } from "express";
import { CatalogRouter } from "../routes/CatalogRoutes";

export default async (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(__dirname));

  app.use("/api", CatalogRouter);
  return app;
};
