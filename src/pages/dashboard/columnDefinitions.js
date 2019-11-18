const columns = [
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
    },  {
      name: "approved",
      label: "Approved",
      options: {
        filter: true,
        sort: true,
      },
    },  {
      name: "fully_permitted",
      label: "Fully permitted",
      options: {
        filter: true,
        sort: true,
      },
    },  {
      name: "initial_cost",
      label: "Initial cost",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },  {
      name: "total_est__fee",
      label: "Total fee (est.)",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },  {
      name: "fee_status",
      label: "Fee status",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },  {
      name: "existing_zoning_sqft",
      label: "Existing zoning (ft2)",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },  {
      name: "proposed_zoning_sqft",
      label: "Proposed zoning (ft2)",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },  {
      name: "horizontal_enlrgmt",
      label: "Horizontal enlargement",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },  {
      name: "vertical_enlrgmt",
      label: "Vertical enlargement",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },  {
      name: "enlargement_sq_footage",
      label: "Enlargement (sq ft)",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },  {
      name: "street_frontage",
      label: "Street frontage",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },  {
      name: "existingno_of_stories",
      label: "Existing stories",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },  {
      name: "proposed_no_of_stories",
      label: "Proposed stories",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },  {
      name: "existing_height",
      label: "Existing height",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },  {
      name: "proposed_height",
      label: "Proposed height",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },  {
      name: "existing_dwelling_units",
      label: "Existing dwelling units",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },  {
      name: "proposed_dwelling_units",
      label: "Proposed dwelling units",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },  {
      name: "existing_occupancy",
      label: "Existing occupancy",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },  {
      name: "proposed_occupancy",
      label: "Proposed occupancy",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },  {
      name: "site_fill",
      label: "Site fill",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },  {
      name: "zoning_dist1",
      label: "Zoning district 1",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },  {
      name: "zoning_dist2",
      label: "Zoning district 2",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    }, {
      name: "zoning_dist3",
      label: "Zoning district 3",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },  {
      name: "special_district_1",
      label: "Special district 1",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    }, {
      name: "special_district_2",
      label: "Special district 2",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    }, {
      name: "owner_type",
      label: "Owner type",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },  {
      name: "non_profit",
      label: "Non-profit",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
  ]

  export default columns;