export interface ColumnDefinition {
  name: string;
  label: string;
  options: {
    filter: boolean;
    sort: boolean;
    display?: boolean;
  };
}

export interface Table {
  title: string;
  url: string;
  chartType: string;
  columns: ColumnDefinition[];
}

export const tables: Table[] = [
  {
    title: "Job Applications BIS",
    url: "",
    chartType: "",
    columns: [
      {
        name: "job_status",
        label: "Status",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "job_status_descrp",
        label: "Status description",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "job__",
        label: "Job number",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "doc__",
        label: "Document",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "borough",
        label: "Borough",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "house__",
        label: "House #",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "street_name",
        label: "Street name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "block",
        label: "Block",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "lot",
        label: "Lot",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "bin__",
        label: "BIN",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "job_type",
        label: "Job type",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "latest_action_date",
        label: "Last action",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "building_type",
        label: "Building type",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "community___board",
        label: "CB",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "cluster",
        label: "Cluster",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "landmarked",
        label: "Landmarked",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "adult_estab",
        label: "Adult establishment",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "loft_board",
        label: "Loft board",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "city_owned",
        label: "City owned",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "little_e",
        label: "Little e",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "pc_filed",
        label: "PC filed",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "efiling_filed",
        label: "Efiled",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "plumbing",
        label: "Plumbing",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "mechanical",
        label: "Mechanical",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "boiler",
        label: "Boiler",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "fuel_burning",
        label: "Fuel burning",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "fuel_storage",
        label: "Fuel storage",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "standpipe",
        label: "Standpipe",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "sprinkler",
        label: "Sprinkler",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "fire_alarm",
        label: "Fire alarm",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "equipment",
        label: "Equipment",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "fire_suppression",
        label: "Fire suppression",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "curb_cut",
        label: "Curb cut",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "other",
        label: "Other",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "other_description",
        label: "Other description",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "applicant_s_first_name",
        label: "Applicant first name",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "applicant_s_last_name",
        label: "Applicant last name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "applicant_professional_title",
        label: "Applicant title",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "professional_cert",
        label: "License type",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "applicant_license__",
        label: "License number",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "pre__filing_date",
        label: "Prefiled",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "paid",
        label: "paid license",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "fully_paid",
        label: "Fully paid",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "assigned",
        label: "Assigned",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "approved",
        label: "Approved",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "fully_permitted",
        label: "Fully permitted",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "initial_cost",
        label: "Initial cost",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "total_est__fee",
        label: "Total fee (est.)",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "fee_status",
        label: "Fee status",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "existing_zoning_sqft",
        label: "Existing zoning (ft2)",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "proposed_zoning_sqft",
        label: "Proposed zoning (ft2)",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "horizontal_enlrgmt",
        label: "Horizontal enlargement",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "vertical_enlrgmt",
        label: "Vertical enlargement",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "enlargement_sq_footage",
        label: "Enlargement (sq ft)",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "street_frontage",
        label: "Street frontage",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "existingno_of_stories",
        label: "Existing stories",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "proposed_no_of_stories",
        label: "Proposed stories",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "existing_height",
        label: "Existing height",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "proposed_height",
        label: "Proposed height",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "existing_dwelling_units",
        label: "Existing dwelling units",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "proposed_dwelling_units",
        label: "Proposed dwelling units",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "existing_occupancy",
        label: "Existing occupancy",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "proposed_occupancy",
        label: "Proposed occupancy",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "site_fill",
        label: "Site fill",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "zoning_dist1",
        label: "Zoning district 1",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "zoning_dist2",
        label: "Zoning district 2",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "zoning_dist3",
        label: "Zoning district 3",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "special_district_1",
        label: "Special district 1",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "special_district_2",
        label: "Special district 2",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "owner_type",
        label: "Owner type",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "non_profit",
        label: "Non-profit",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
    ],
  },
  {
    title: "Job Applications DOB Now!",
    url: "",
    chartType: "",
    columns: [
      {
        name: "job_filing_number",
        label: "Job Filing Number",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "filing_status",
        label: "Filing Status",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "house_no",
        label: "House No",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "street_name",
        label: "Street Name",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "borough",
        label: "Borough",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "block",
        label: "Block",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "lot",
        label: "LOT",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },

      {
        name: "bin",
        label: "Bin",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "commmunity_board",
        label: "Commmunity - Board",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "work_on_floor",
        label: "Work on Floor",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "apt_condo_no_s",
        label: "Apt./Condo No(s)",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "applicant_professional_title",
        label: "Applicant Professional Title",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "applicant_license",
        label: "Applicant License #",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "applicant_first_name",
        label: "Applicant First Name",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "applicants_middle_initial",
        label: "Applicants Middle Initial",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "applicant_last_name",
        label: "Applicant Last Name",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "owner_s_business_name",
        label: "Owner's Business Name",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "owner_s_street_name",
        label: "Owner's Street Name",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },

      {
        name: "city",
        label: "City",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "state",
        label: "State",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "zip",
        label: "Zip",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "filing_representative_first_name",
        label: "Filing Representative First Name",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "filing_representative_middle_initial",
        label: "Filing Representative Middle Initial",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "filing_representative_last_name",
        label: "Filing Representative Last Name",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "filing_representative_business_name",
        label: "Filing Representative Business Name",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "filing_representative_street_name",
        label: "Filing Representative Street Name",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "filing_representative_city",
        label: "Filing Representative City",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "filing_representative_state",
        label: "Filing Representative State",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "filing_representative_zip",
        label: "Filing Representative Zip",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "sprinkler_work_type",
        label: "Sprinkler (Work Type)",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },

      {
        name: "plumbing_work_type",
        label: "Plumbing (Work Type)",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "initial_cost",
        label: "Initial Cost",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "total_construction_floor_area",
        label: "Total Construction Floor Area",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "total_construction_floor_area",
        label: "Total Construction Floor Area",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "review_building_code",
        label: "Review Building Code",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "little_e",
        label: "Little E",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "unmapped_cco_street",
        label: "Unmapped/CCO Street",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "request_legalization",
        label: "Request Legalization",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "includes_permanent_removal",
        label: "Includes Permanent Removal",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "in_compliance_with_nycecc",
        label: "In Compliance with NYCECC",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "exempt_from_nycecc",
        label: "Exempt from NYCECC",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "building_type",
        label: "Building Type",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "existing_stories",
        label: "Existing Stories",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "existing_height",
        label: "Existing Height",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "existing_dwelling_units",
        label: "Existing Dwelling Units",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "proposed_no_of_stories",
        label: "Proposed No of Stories",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "proposed_height",
        label: "Proposed Height",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "proposed_dwelling_units",
        label: "Proposed Dwelling Units",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "specialinspectionrequirement",
        label: "Special Inspection Requirement",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "special_inspection_agency_number",
        label: "Special Inspection Agency Number",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "progressinspectionrequirement",
        label: "Progress Inspection Requirement",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "built_1_information_value",
        label: "Built 1 information value",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "built_2_information_value",
        label: "Built 2 information value",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "built_2_a_information_value",
        label: "Built 2 A information value",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "built_2_b_information_value",
        label: "Built 2 B information value",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "built_2_b_information_value",
        label: "Built 2 B information value",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "standpipe",
        label: "Standpipe",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "antenna",
        label: "Antenna",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "curb_cut",
        label: "Curb Cut",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "sign",
        label: "Sign",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "fence",
        label: "Fence",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "scaffold",
        label: "Scaffold",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "shed",
        label: "Shed",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "latitude",
        label: "Latitude",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "longitude",
        label: "Longitude",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "council_district",
        label: "Council District",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "census_tract",
        label: "Census Tract",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "nta",
        label: "NTA Tract",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
    ],
  },
  {
    title: "Job Applications DOB Now!",
    url: "",
    chartType: "",
    columns: [
      {
        name: "isn_dob_bis_viol",
        label: "Violation number",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "boro",
        label: "Borough",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "bin",
        label: "BIN",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "block",
        label: "Block",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "lot",
        label: "Lot",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "issue_date",
        label: "Issued",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "violation_type_code",
        label: "Violation type code",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },

      {
        name: "violation_number",
        label: "Violation number",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "house_number",
        label: "House number",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "street",
        label: "Street",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "disposition_date",
        label: "Disposition date",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "disposition_comments",
        label: "Disposition comments",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "device_number",
        label: "Device number",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "description",
        label: "Description",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "ecb_number",
        label: "ECB Number",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
      {
        name: "number",
        label: "Number",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },

      {
        name: "violation_category",
        label: "Violation category",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },

      {
        name: "violation_type",
        label: "Violation type",
        options: {
          filter: true,
          sort: true,
          display: true,
        },
      },
    ],
  },
];
