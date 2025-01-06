import { AppState } from '../AppState.js'

const mockDemos = [
  {
    id: 1,
    title: "Merging Duplicate Records",
    description: "Master the process of efficiently combining and managing duplicate records",
    captureUrl: "https://capture.navattic.com/cm2jg9r7s001203l7drps4qjf",
    config: { title: "Merging Duplicate Records" },
    thumbnail: "/src/assets/img/merge-records.png",
    category: "account"
  },
  {
    id: 2,
    title: "Creating Taxpayer Account",
    description: "Step-by-step guide for creating a new taxpayer account",
    captureUrl: "https://capture.navattic.com/cm2nr9j7g000003l110nc718a",
    config: { title: "Creating Taxpayer Account" },
    thumbnail: "/src/assets/img/create-account.png",
    category: "getting-started"
  },
  {
    id: 3,
    title: "Deactivating/Deleting Admin User",
    description: "Learn how to manage admin user access",
    captureUrl: "https://capture.navattic.com/cm2f7fw72000003lgeqxo7ue7",
    config: { title: "Deactivating/Deleting Admin User" },
    thumbnail: "/src/assets/img/deactivate-admin.png",
    category: "account"
  },
  {
    id: 4,
    title: "Inviting Admin User",
    description: "Step-by-step process for adding new administrators",
    captureUrl: "https://capture.navattic.com/cm3971p42000h03jr49vp8tqd",
    config: { title: "Inviting Admin User" },
    thumbnail: "/src/assets/img/invite-admin.png",
    category: "account"
  },
  {
    id: 5,
    title: "Activating Admin User",
    description: "Guide for enabling administrator access",
    captureUrl: "https://capture.navattic.com/cm39722lw000003mh610y39xq",
    config: { title: "Activating Admin User" },
    thumbnail: "/src/assets/img/activate-admin.png",
    category: "account"
  },
  {
    id: 6,
    title: "Exporting Individual Return Files",
    description: "Learn to export individual tax return documents",
    captureUrl: "https://capture.navattic.com/cm2jdxv7s000303ju8b3a5bld",
    config: { title: "Exporting Individual Return Files" },
    thumbnail: "/src/assets/img/export-returns.png",
    category: "tax-forms"
  },
  {
    id: 7,
    title: "Reviewing Individual Export Data",
    description: "Guide for reviewing exported tax information",
    captureUrl: "https://capture.navattic.com/cm29i8byk000803kzgarq4wi2",
    config: { title: "Reviewing Individual Export Data" },
    thumbnail: "/src/assets/img/review-exports.png",
    category: "reports"
  },
  {
    id: 8,
    title: "Linking a Spouse",
    description: "Process for connecting spouse accounts",
    captureUrl: "https://capture.navattic.com/clxnh2ksy00000al8bh5z5fin",
    config: { title: "Linking a Spouse" },
    thumbnail: "/src/assets/img/link-spouse.png",
    category: "account"
  },
  {
    id: 9,
    title: "Invalidating Payment",
    description: "Steps to invalidate incorrect payments",
    captureUrl: "https://capture.navattic.com/clwv7ng8x00000aldb0k051rk",
    config: { title: "Invalidating Payment" },
    thumbnail: "/src/assets/img/invalidate-payment.png",
    category: "payroll"
  },
  {
    id: 10,
    title: "Moving a Payment",
    description: "Guide for transferring payments between accounts",
    captureUrl: "https://capture.navattic.com/clxjyasux000209l78lmxaxo0",
    config: { title: "Moving a payment" },
    thumbnail: "/src/assets/img/move-payment.png",
    category: "payroll"
  },
  {
    id: 11,
    title: "Withheld Payments Change - WH Correction",
    description: "Guide for correcting withholding payment information",
    captureUrl: "https://capture.navattic.com/cm0wzgyj6001503l5794hg8f7",
    config: { title: "Withheld Payments Change - WH Correction" },
    thumbnail: "/src/assets/img/withholding-correction.png",
    category: "payroll"
  },
  {
    id: 12,
    title: "Invalidating Routing & Account Numbers",
    description: "Process for handling invalid banking information",
    captureUrl: "https://capture.navattic.com/cm0wwxobc000103jv0qb08wuu",
    config: { title: "Invalidating Routing & Account Numbers" },
    thumbnail: "/src/assets/img/invalid-routing.png",
    category: "payroll"
  },
  {
    id: 13,
    title: "Deleting a Taxpayer",
    description: "Steps for removing taxpayer records",
    captureUrl: "https://capture.navattic.com/cm2f8gqh2000003jx0szmassg",
    config: { title: "Deleting a Taxpayer" },
    thumbnail: "/src/assets/img/delete-taxpayer.png",
    category: "account"
  },
  {
    id: 14,
    title: "Changing User Permission Status",
    description: "Guide for modifying user access levels",
    captureUrl: "https://capture.navattic.com/cm2f8so3r000003jyh9b27ee0",
    config: { title: "Changing User Permission Status" },
    thumbnail: "/src/assets/img/change-permissions.png",
    category: "account"
  },
  {
    id: 15,
    title: "Changing City Site Open/Deadline/Close Date",
    description: "Managing important city site dates and deadlines",
    captureUrl: "https://capture.navattic.com/cm2f9cal9000103jz902s094r",
    config: { title: "Changing City Site Open/Deadline/Close Date" },
    thumbnail: "/src/assets/img/change-dates.png",
    category: "account"
  }
]

class DemoService {
  getDemos() {
    AppState.demos = mockDemos
  }
}

export const demoService = new DemoService()
