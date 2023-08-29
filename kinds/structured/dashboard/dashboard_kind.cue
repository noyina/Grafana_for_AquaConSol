package kind

import "strings"

name:     "Dashboard"
maturity: "merged"

lineage: seqs: [
	{
		schemas: [
			{// 0.0
				@grafana(TSVeneer="type")

				// Unique numeric identifier for the dashboard.
				// TODO must isolate or remove identifiers local to a Grafana instance...?
				id?: int64
				// Unique dashboard identifier that can be generated by anyone. string (8-40)
				uid?: string
				// Title of dashboard.
				title?: string
				// Description of dashboard.
				description?: string

				gnetId?: string @grafanamaturity(NeedsExpertReview)
				// Tags associated with dashboard.
				tags?: [...string] @grafanamaturity(NeedsExpertReview)
				// Theme of dashboard.
				style: "light" | *"dark" @grafanamaturity(NeedsExpertReview)
				// Timezone of dashboard,
				timezone?: *"browser" | "utc" | "" @grafanamaturity(NeedsExpertReview)
				// Whether a dashboard is editable or not.
				editable:     bool | *true
				graphTooltip: #DashboardCursorSync @grafanamaturity(NeedsExpertReview)
				// Time range for dashboard, e.g. last 6 hours, last 7 days, etc
				time?: {
					from: string | *"now-6h"
					to:   string | *"now"
				} @grafanamaturity(NeedsExpertReview)

				// TODO docs
				// TODO this appears to be spread all over in the frontend. Concepts will likely need tidying in tandem with schema changes
				timepicker?: {
					// Whether timepicker is collapsed or not.
					collapse: bool | *false
					// Whether timepicker is enabled or not.
					enable: bool | *true
					// Whether timepicker is visible or not.
					hidden: bool | *false
					// Selectable intervals for auto-refresh.
					refresh_intervals: [...string] | *["5s", "10s", "30s", "1m", "5m", "15m", "30m", "1h", "2h", "1d"]
					// TODO docs
					time_options: [...string] | *["5m", "15m", "1h", "6h", "12h", "24h", "2d", "7d", "30d"]
				} @grafanamaturity(NeedsExpertReview)
				// TODO docs
				fiscalYearStartMonth?: uint8 & <13 @grafanamaturity(NeedsExpertReview)
				// TODO docs
				liveNow?: bool @grafanamaturity(NeedsExpertReview)
				// TODO docs
				weekStart?: string @grafanamaturity(NeedsExpertReview)

				// TODO docs
				refresh?: string | false @grafanamaturity(NeedsExpertReview)
				// Version of the JSON schema, incremented each time a Grafana update brings
				// changes to said schema.
				// TODO this is the existing schema numbering system. It will be replaced by Thema's themaVersion
				schemaVersion: uint16 | *36
				// Version of the dashboard, incremented each time the dashboard is updated.
				version?: uint32 @grafanamaturity(NeedsExpertReview)
				panels?: [...(#Panel | #RowPanel | #GraphPanel | #HeatmapPanel)] @grafanamaturity(NeedsExpertReview)
				// TODO docs
				templating?: {
					list: [...#VariableModel] @grafanamaturity(NeedsExpertReview)
				}
				// TODO docs
				annotations?: {
					list: [...#AnnotationQuery] @grafanamaturity(NeedsExpertReview)
				}
				// TODO docs
				links?: [...#DashboardLink] @grafanamaturity(NeedsExpertReview)

				///////////////////////////////////////
				// Definitions (referenced above) are declared below

				// TODO docs
				#AnnotationTarget: {
					limit:    int64
					matchAny: bool
					tags: [...string]
					type: string
				} @cuetsy(kind="interface") @grafanamaturity(NeedsExpertReview)

				// TODO docs
				// FROM: AnnotationQuery in grafana-data/src/types/annotations.ts
				#AnnotationQuery: {
					// Datasource to use for annotation.
					datasource: {
						type?: string
						uid?:  string
					} @grafanamaturity(NeedsExpertReview)

					// Whether annotation is enabled.
					enable: bool | *true @grafanamaturity(NeedsExpertReview)
					// Name of annotation.
					name?:   string     @grafanamaturity(NeedsExpertReview)
					builtIn: uint8 | *0 @grafanamaturity(NeedsExpertReview) // TODO should this be persisted at all?
					// Whether to hide annotation.
					hide?: bool | *false @grafanamaturity(NeedsExpertReview)
					// Annotation icon color.
					iconColor?: string                @grafanamaturity(NeedsExpertReview)
					type:       string | *"dashboard" @grafanamaturity(NeedsExpertReview)
					// Query for annotation data.
					rawQuery?: string            @grafanamaturity(NeedsExpertReview)
					showIn:    uint8 | *0        @grafanamaturity(NeedsExpertReview)
					target?:   #AnnotationTarget @grafanamaturity(NeedsExpertReview)
				} @cuetsy(kind="interface")

				// FROM: packages/grafana-data/src/types/templateVars.ts
				// TODO docs
				// TODO what about what's in public/app/features/types.ts?
				// TODO there appear to be a lot of different kinds of [template] vars here? if so need a disjunction
				#VariableModel: {
					type:   #VariableType
					name:   string
					label?: string
					...
				} @cuetsy(kind="interface") @grafanamaturity(NeedsExpertReview)

				// FROM public/app/features/dashboard/state/DashboardModels.ts - ish
				// TODO docs
				#DashboardLink: {
					title:    string             @grafanamaturity(NeedsExpertReview)
					type:     #DashboardLinkType @grafanamaturity(NeedsExpertReview)
					icon?:    string             @grafanamaturity(NeedsExpertReview)
					tooltip?: string             @grafanamaturity(NeedsExpertReview)
					url?:     string             @grafanamaturity(NeedsExpertReview)
					tags: [...string] @grafanamaturity(NeedsExpertReview)
					asDropdown:  bool | *false @grafanamaturity(NeedsExpertReview)
					targetBlank: bool | *false @grafanamaturity(NeedsExpertReview)
					includeVars: bool | *false @grafanamaturity(NeedsExpertReview)
					keepTime:    bool | *false @grafanamaturity(NeedsExpertReview)
				} @cuetsy(kind="interface")

				// TODO docs
				#DashboardLinkType: "link" | "dashboards" @cuetsy(kind="type") @grafanamaturity(NeedsExpertReview)

				// FROM: packages/grafana-data/src/types/templateVars.ts
				// TODO docs
				// TODO this implies some wider pattern/discriminated union, probably?
				#VariableType: "query" | "adhoc" | "constant" | "datasource" | "interval" | "textbox" | "custom" | "system" @cuetsy(kind="type") @grafanamaturity(NeedsExpertReview)

				// TODO docs
				#FieldColorModeId: "thresholds" | "palette-classic" | "palette-saturated" | "continuous-GrYlRd" | "fixed" @cuetsy(kind="enum",memberNames="Thresholds|PaletteClassic|PaletteSaturated|ContinuousGrYlRd|Fixed") @grafanamaturity(NeedsExpertReview)

				// TODO docs
				#FieldColorSeriesByMode: "min" | "max" | "last" @cuetsy(kind="type") @grafanamaturity(NeedsExpertReview)

				// TODO docs
				#FieldColor: {
					// The main color scheme mode
					mode: #FieldColorModeId | string
					// Stores the fixed color value if mode is fixed
					fixedColor?: string
					// Some visualizations need to know how to assign a series color from by value color schemes
					seriesBy?: #FieldColorSeriesByMode
				} @cuetsy(kind="interface") @grafanamaturity(NeedsExpertReview)

				#GridPos: {
					// Panel
					h: uint32 & >0 | *9 @grafanamaturity(NeedsExpertReview)
					// Panel
					w: uint32 & >0 & <=24 | *12 @grafanamaturity(NeedsExpertReview)
					// Panel x
					x: uint32 & >=0 & <24 | *0 @grafanamaturity(NeedsExpertReview)
					// Panel y
					y: uint32 & >=0 | *0 @grafanamaturity(NeedsExpertReview)
					// true if fixed
					static?: bool @grafanamaturity(NeedsExpertReview)
				} @cuetsy(kind="interface")

				// TODO docs
				#Threshold: {
					// TODO docs
					// FIXME the corresponding typescript field is required/non-optional, but nulls currently appear here when serializing -Infinity to JSON
					value?: number @grafanamaturity(NeedsExpertReview)
					// TODO docs
					color: string @grafanamaturity(NeedsExpertReview)
					// TODO docs
					// TODO are the values here enumerable into a disjunction?
					// Some seem to be listed in typescript comment
					state?: string @grafanamaturity(NeedsExpertReview)
				} @cuetsy(kind="interface") @grafanamaturity(NeedsExpertReview)

				#ThresholdsMode: "absolute" | "percentage" @cuetsy(kind="enum") @grafanamaturity(NeedsExpertReview)

				#ThresholdsConfig: {
					mode: #ThresholdsMode @grafanamaturity(NeedsExpertReview)

					// Must be sorted by 'value', first value is always -Infinity
					steps: [...#Threshold] @grafanamaturity(NeedsExpertReview)
				} @cuetsy(kind="interface") @grafanamaturity(NeedsExpertReview)

				// TODO docs
				#ValueMapping: #ValueMap | #RangeMap | #RegexMap | #SpecialValueMap @cuetsy(kind="type") @grafanamaturity(NeedsExpertReview)

				// TODO docs
				#MappingType: "value" | "range" | "regex" | "special" @cuetsy(kind="enum",memberNames="ValueToText|RangeToText|RegexToText|SpecialValue") @grafanamaturity(NeedsExpertReview)

				// TODO docs
				#ValueMap: {
					type: #MappingType & "value"
					options: [string]: #ValueMappingResult
				} @cuetsy(kind="interface")

				// TODO docs
				#RangeMap: {
					type: #MappingType & "range"
					options: {
						// to and from are `number | null` in current ts, really not sure what to do
						from:   float64 @grafanamaturity(NeedsExpertReview)
						to:     float64 @grafanamaturity(NeedsExpertReview)
						result: #ValueMappingResult
					}
				} @cuetsy(kind="interface") @grafanamaturity(NeedsExpertReview)

				// TODO docs
				#RegexMap: {
					type: #MappingType & "regex"
					options: {
						pattern: string
						result:  #ValueMappingResult
					}
				} @cuetsy(kind="interface") @grafanamaturity(NeedsExpertReview)

				// TODO docs
				#SpecialValueMap: {
					type: #MappingType & "special"
					options: {
						match:   "true" | "false"
						pattern: string
						result:  #ValueMappingResult
					}
				} @cuetsy(kind="interface") @grafanamaturity(NeedsExpertReview)

				// TODO docs
				#SpecialValueMatch: "true" | "false" | "null" | "nan" | "null+nan" | "empty" @cuetsy(kind="enum",memberNames="True|False|Null|NaN|NullAndNan|Empty")

				// TODO docs
				#ValueMappingResult: {
					text?:  string
					color?: string
					icon?:  string
					index?: int32
				} @cuetsy(kind="interface")

				// TODO docs
				// FIXME this is extremely underspecfied; wasn't obvious which typescript types corresponded to it
				#Transformation: {
					id: string
					options: {...}
				} @cuetsy(kind="interface") @grafanamaturity(NeedsExpertReview)

				// 0 for no shared crosshair or tooltip (default).
				// 1 for shared crosshair.
				// 2 for shared crosshair AND shared tooltip.
				#DashboardCursorSync: *0 | 1 | 2 @cuetsy(kind="enum",memberNames="Off|Crosshair|Tooltip") @grafanamaturity(NeedsExpertReview)

				// Schema for panel targets is specified by datasource
				// plugins. We use a placeholder definition, which the Go
				// schema loader either left open/as-is with the Base
				// variant of the Dashboard and Panel families, or filled
				// with types derived from plugins in the Instance variant.
				// When working directly from CUE, importers can extend this
				// type directly to achieve the same effect.
				#Target: {...} @grafanamaturity(NeedsExpertReview)

				// Dashboard panels. Panels are canonically defined inline
				// because they share a version timeline with the dashboard
				// schema; they do not evolve independently.
				#Panel: {
					// The panel plugin type id. May not be empty.
					type: string & strings.MinRunes(1) @grafanamaturity(NeedsExpertReview)

					// TODO docs
					id?: uint32 @grafanamaturity(NeedsExpertReview)

					// FIXME this almost certainly has to be changed in favor of scuemata versions
					pluginVersion?: string @grafanamaturity(NeedsExpertReview)

					// TODO docs
					tags?: [...string] @grafanamaturity(NeedsExpertReview)

					// TODO docs
					targets?: [...#Target] @grafanamaturity(NeedsExpertReview)

					// Panel title.
					title?: string @grafanamaturity(NeedsExpertReview)
					// Description.
					description?: string @grafanamaturity(NeedsExpertReview)
					// Whether to display the panel without a background.
					transparent: bool | *false @grafanamaturity(NeedsExpertReview)
					// The datasource used in all targets.
					datasource?: {
						type?: string
						uid?:  string
					} @grafanamaturity(NeedsExpertReview)
					// Grid position.
					gridPos?: #GridPos
					// Panel links.
					// TODO fill this out - seems there are a couple variants?
					links?: [...#DashboardLink] @grafanamaturity(NeedsExpertReview)

					// Name of template variable to repeat for.
					repeat?: string @grafanamaturity(NeedsExpertReview)
					// Direction to repeat in if 'repeat' is set.
					// "h" for horizontal, "v" for vertical.
					repeatDirection: *"h" | "v" @grafanamaturity(NeedsExpertReview)

					// TODO docs
					maxDataPoints?: number @grafanamaturity(NeedsExpertReview)

					// TODO docs - seems to be an old field from old dashboard alerts?
					thresholds?: [...] @grafanamaturity(NeedsExpertReview)

					// TODO docs
					timeRegions?: [...] @grafanamaturity(NeedsExpertReview)

					transformations: [...#Transformation] @grafanamaturity(NeedsExpertReview)

					// TODO docs
					// TODO tighter constraint
					interval?: string @grafanamaturity(NeedsExpertReview)

					// TODO docs
					// TODO tighter constraint
					timeFrom?: string @grafanamaturity(NeedsExpertReview)

					// TODO docs
					// TODO tighter constraint
					timeShift?: string @grafanamaturity(NeedsExpertReview)

					// options is specified by the PanelOptions field in panel
					// plugin schemas.
					options: {...} @grafanamaturity(NeedsExpertReview)

					fieldConfig: #FieldConfigSource
				} @cuetsy(kind="interface") @grafana(TSVeneer="type") @grafanamaturity(NeedsExpertReview)

				#FieldConfigSource: {
					defaults: #FieldConfig
					overrides: [...{
						matcher: #MatcherConfig
						properties: [...#DynamicConfigValue]
					}] @grafanamaturity(NeedsExpertReview)
				} @cuetsy(kind="interface") @grafana(TSVeneer="type") @grafanamaturity(NeedsExpertReview)

				#MatcherConfig: {
					id:       string | *"" @grafanamaturity(NeedsExpertReview)
					options?: _            @grafanamaturity(NeedsExpertReview)
				} @cuetsy(kind="interface")

				#DynamicConfigValue: {
					id:     string | *"" @grafanamaturity(NeedsExpertReview)
					value?: _            @grafanamaturity(NeedsExpertReview)
				}

				#FieldConfig: {
					// The display value for this field.  This supports template variables blank is auto
					displayName?: string @grafanamaturity(NeedsExpertReview)

					// This can be used by data sources that return and explicit naming structure for values and labels
					// When this property is configured, this value is used rather than the default naming strategy.
					displayNameFromDS?: string @grafanamaturity(NeedsExpertReview)

					// Human readable field metadata
					description?: string @grafanamaturity(NeedsExpertReview)

					// An explicit path to the field in the datasource.  When the frame meta includes a path,
					// This will default to `${frame.meta.path}/${field.name}
					//
					// When defined, this value can be used as an identifier within the datasource scope, and
					// may be used to update the results
					path?: string @grafanamaturity(NeedsExpertReview)

					// True if data source can write a value to the path.  Auth/authz are supported separately
					writeable?: bool @grafanamaturity(NeedsExpertReview)

					// True if data source field supports ad-hoc filters
					filterable?: bool @grafanamaturity(NeedsExpertReview)

					// Numeric Options
					unit?: string @grafanamaturity(NeedsExpertReview)

					// Significant digits (for display)
					decimals?: number @grafanamaturity(NeedsExpertReview)

					min?: number @grafanamaturity(NeedsExpertReview)
					max?: number @grafanamaturity(NeedsExpertReview)

					// Convert input values into a display string
					mappings?: [...#ValueMapping] @grafanamaturity(NeedsExpertReview)

					// Map numeric values to states
					thresholds?: #ThresholdsConfig @grafanamaturity(NeedsExpertReview)

					// Map values to a display color
					color?: #FieldColor @grafanamaturity(NeedsExpertReview)

					// Used when reducing field values
					//   nullValueMode?: NullValueMode

					// The behavior when clicking on a result
					links?: [...] @grafanamaturity(NeedsExpertReview)

					// Alternative to empty string
					noValue?: string @grafanamaturity(NeedsExpertReview)

					// custom is specified by the PanelFieldConfig field
					// in panel plugin schemas.
					custom?: {...} @grafanamaturity(NeedsExpertReview)
				} @cuetsy(kind="interface") @grafana(TSVeneer="type") @grafanamaturity(NeedsExpertReview)

				// Row panel
				#RowPanel: {
					type:      "row"         @grafanamaturity(NeedsExpertReview)
					collapsed: bool | *false @grafanamaturity(NeedsExpertReview)
					title?:    string        @grafanamaturity(NeedsExpertReview)

					// Name of default datasource.
					datasource?: {
						type?: string @grafanamaturity(NeedsExpertReview)
						uid?:  string @grafanamaturity(NeedsExpertReview)
					} @grafanamaturity(NeedsExpertReview)

					gridPos?: #GridPos
					id:       uint32 @grafanamaturity(NeedsExpertReview)
					panels: [...(#Panel | #GraphPanel | #HeatmapPanel)] @grafanamaturity(NeedsExpertReview)
					// Name of template variable to repeat for.
					repeat?: string @grafanamaturity(NeedsExpertReview)
				} @cuetsy(kind="interface") @grafanamaturity(NeedsExpertReview)

				// Support for legacy graph and heatmap panels.
				#GraphPanel: {
					type: "graph" @grafanamaturity(NeedsExpertReview)
					...
				} @grafanamaturity(NeedsExpertReview)
				#HeatmapPanel: {
					type: "heatmap" @grafanamaturity(NeedsExpertReview)
					...
				} @grafanamaturity(NeedsExpertReview)
			},
		]
	},
]
