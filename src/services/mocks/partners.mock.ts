import { IPartner } from "@/types/cms";
import { IStrapiCollectionResponse } from "@/types/strapi";
import mockPartnerLogo01 from "@/lib/assets/mock-images/home/partner-logo-01.svg";
import mockPartnerLogo02 from "@/lib/assets/mock-images/home/partner-logo-02.svg";
import mockPartnerLogo03 from "@/lib/assets/mock-images/home/partner-logo-03.svg";
import mockPartnerLogo04 from "@/lib/assets/mock-images/home/partner-logo-04.svg";
import mockPartnerLogo05 from "@/lib/assets/mock-images/home/partner-logo-05.svg";
import mockPartnerLogo06 from "@/lib/assets/mock-images/home/partner-logo-06.svg";

export const mockPartners: IStrapiCollectionResponse<IPartner> = {
  data: [
    {
      id: 1,
      documentId: "partner-logo-1",
      createdAt: "2026-07-14T00:00:00.000Z",
      updatedAt: "2026-07-14T00:00:00.000Z",
      name: "Logo 01",
      logo: {
        id: 101,
        documentId: "media-partner-1",
        name: "partner-logo-01.svg",
        alternativeText: "Logo 01",
        caption: null,
        width: 167,
        height: 64,
        formats: null,
        hash: "logo1",
        ext: ".svg",
        mime: "image/svg+xml",
        size: 24,
        url:
          typeof mockPartnerLogo01 === "string"
            ? mockPartnerLogo01
            : mockPartnerLogo01.src,
        previewUrl: null,
        provider: "local",
        provider_metadata: null,
        createdAt: "2026-07-14T00:00:00.000Z",
        updatedAt: "2026-07-14T00:00:00.000Z",
        publishedAt: "2026-07-14T00:00:00.000Z",
      },
    },
    {
      id: 2,
      documentId: "partner-logo-2",
      createdAt: "2026-07-14T00:00:00.000Z",
      updatedAt: "2026-07-14T00:00:00.000Z",
      name: "Logo 02",
      logo: {
        id: 102,
        documentId: "media-partner-2",
        name: "partner-logo-02.svg",
        alternativeText: "Logo 02",
        caption: null,
        width: 166,
        height: 64,
        formats: null,
        hash: "logo2",
        ext: ".svg",
        mime: "image/svg+xml",
        size: 72,
        url:
          typeof mockPartnerLogo02 === "string"
            ? mockPartnerLogo02
            : mockPartnerLogo02.src,
        previewUrl: null,
        provider: "local",
        provider_metadata: null,
        createdAt: "2026-07-14T00:00:00.000Z",
        updatedAt: "2026-07-14T00:00:00.000Z",
        publishedAt: "2026-07-14T00:00:00.000Z",
      },
    },
    {
      id: 3,
      documentId: "partner-logo-3",
      createdAt: "2026-07-14T00:00:00.000Z",
      updatedAt: "2026-07-14T00:00:00.000Z",
      name: "Logo 03",
      logo: {
        id: 103,
        documentId: "media-partner-3",
        name: "partner-logo-03.svg",
        alternativeText: "Logo 03",
        caption: null,
        width: 167,
        height: 64,
        formats: null,
        hash: "logo3",
        ext: ".svg",
        mime: "image/svg+xml",
        size: 24,
        url:
          typeof mockPartnerLogo03 === "string"
            ? mockPartnerLogo03
            : mockPartnerLogo03.src,
        previewUrl: null,
        provider: "local",
        provider_metadata: null,
        createdAt: "2026-07-14T00:00:00.000Z",
        updatedAt: "2026-07-14T00:00:00.000Z",
        publishedAt: "2026-07-14T00:00:00.000Z",
      },
    },
    {
      id: 4,
      documentId: "partner-logo-4",
      createdAt: "2026-07-14T00:00:00.000Z",
      updatedAt: "2026-07-14T00:00:00.000Z",
      name: "Logo 04",
      logo: {
        id: 104,
        documentId: "media-partner-4",
        name: "partner-logo-04.svg",
        alternativeText: "Logo 04",
        caption: null,
        width: 167,
        height: 64,
        formats: null,
        hash: "logo4",
        ext: ".svg",
        mime: "image/svg+xml",
        size: 33,
        url:
          typeof mockPartnerLogo04 === "string"
            ? mockPartnerLogo04
            : mockPartnerLogo04.src,
        previewUrl: null,
        provider: "local",
        provider_metadata: null,
        createdAt: "2026-07-14T00:00:00.000Z",
        updatedAt: "2026-07-14T00:00:00.000Z",
        publishedAt: "2026-07-14T00:00:00.000Z",
      },
    },
    {
      id: 5,
      documentId: "partner-logo-5",
      createdAt: "2026-07-14T00:00:00.000Z",
      updatedAt: "2026-07-14T00:00:00.000Z",
      name: "Logo 05",
      logo: {
        id: 105,
        documentId: "media-partner-5",
        name: "partner-logo-05.svg",
        alternativeText: "Logo 05",
        caption: null,
        width: 167,
        height: 64,
        formats: null,
        hash: "logo5",
        ext: ".svg",
        mime: "image/svg+xml",
        size: 22,
        url:
          typeof mockPartnerLogo05 === "string"
            ? mockPartnerLogo05
            : mockPartnerLogo05.src,
        previewUrl: null,
        provider: "local",
        provider_metadata: null,
        createdAt: "2026-07-14T00:00:00.000Z",
        updatedAt: "2026-07-14T00:00:00.000Z",
        publishedAt: "2026-07-14T00:00:00.000Z",
      },
    },
    {
      id: 6,
      documentId: "partner-logo-6",
      createdAt: "2026-07-14T00:00:00.000Z",
      updatedAt: "2026-07-14T00:00:00.000Z",
      name: "Logo 06",
      logo: {
        id: 106,
        documentId: "media-partner-6",
        name: "partner-logo-06.svg",
        alternativeText: "Logo 06",
        caption: null,
        width: 167,
        height: 64,
        formats: null,
        hash: "logo6",
        ext: ".svg",
        mime: "image/svg+xml",
        size: 3,
        url:
          typeof mockPartnerLogo06 === "string"
            ? mockPartnerLogo06
            : mockPartnerLogo06.src,
        previewUrl: null,
        provider: "local",
        provider_metadata: null,
        createdAt: "2026-07-14T00:00:00.000Z",
        updatedAt: "2026-07-14T00:00:00.000Z",
        publishedAt: "2026-07-14T00:00:00.000Z",
      },
    },
  ],
  meta: {},
};
