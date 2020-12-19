# AccessLogEventService

## Preamble

The `AccessLogEventService` directly accesses the models served by the [WebAccessService](https://github.com/outlawdesigns-io/WebAccessService), monitors for new [Request]() events, and imports them into the data store.

This will decouple [AccessLogParser](https://github.com/outlawdesigns-io/AccessLogParser) from [WebAccessService](https://github.com/outlawdesigns-io/WebAccessService) and effectively end support for the package. The adoption of this package will result in a fundamental change in approach to log collection. The move from a time/batch approach to an event based approach will have the following effects:

* Simplify code-base
  * Applying UNIX philosophy will make code easy to understand, maintain and expand.
* Limit maintenance
  * Eliminate need to monitor cron schedules.
  * Significantly reduce frequency of log file truncation.
 * Facilitate development
	 * Opens the door for more event based services and real time notifications.

## Setup

* It is imperative that the `DB` and `TABLE` constants in `./src/models/` match those used by [WebAccessService](https://github.com/outlawdesigns-io/WebAccessService).
