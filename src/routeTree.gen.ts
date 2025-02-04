/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProfileIndexImport } from './routes/profile/index'
import { Route as AddTaskIndexImport } from './routes/add-task/index'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const ProfileIndexRoute = ProfileIndexImport.update({
  id: '/profile/',
  path: '/profile/',
  getParentRoute: () => rootRoute,
} as any)

const AddTaskIndexRoute = AddTaskIndexImport.update({
  id: '/add-task/',
  path: '/add-task/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/add-task/': {
      id: '/add-task/'
      path: '/add-task'
      fullPath: '/add-task'
      preLoaderRoute: typeof AddTaskIndexImport
      parentRoute: typeof rootRoute
    }
    '/profile/': {
      id: '/profile/'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/add-task': typeof AddTaskIndexRoute
  '/profile': typeof ProfileIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/add-task': typeof AddTaskIndexRoute
  '/profile': typeof ProfileIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/add-task/': typeof AddTaskIndexRoute
  '/profile/': typeof ProfileIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/add-task' | '/profile'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/add-task' | '/profile'
  id: '__root__' | '/' | '/add-task/' | '/profile/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AddTaskIndexRoute: typeof AddTaskIndexRoute
  ProfileIndexRoute: typeof ProfileIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AddTaskIndexRoute: AddTaskIndexRoute,
  ProfileIndexRoute: ProfileIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/add-task/",
        "/profile/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/add-task/": {
      "filePath": "add-task/index.tsx"
    },
    "/profile/": {
      "filePath": "profile/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
