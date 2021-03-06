/*####################################################################
 * The EnablementLabels class.
 */

module hd.enable {

  import u = hd.utility;
  import r = hd.reactive;

  /*==================================================================
   * Label for an edge in the enablement graph.
   */
  export enum Label { Irrelevant = 1,
                      AssumedRelevant = 2,
                      Relevant = 3
                    };

  /*==================================================================
   * The enablement graph is the same as the solution graph with
   * labels.  So, rather than copying the structure of the solution
   * graph, we just store here the labels.  Thus,
   *   SolutionGraph + EnablementLabels = EnablementGraph
   */
  export class EnablementLabels extends r.BasicObservable<EnablementLabels> {

    // (cid -> mid)
    selected: u.Dictionary<string> = {};

    // Label for each method  (mid -> vid -> label)
    labels: u.Dictionary<u.Dictionary<Label>> = {};

    scheduled = false;

    /*----------------------------------------------------------------
     * Indicate new selected method for constraint.
     * Primarily just deletes any existing labels for that constraint.
     */
    selectMethod( cid: string, mid: string ) {
      var oldmid = this.selected[cid];
      var labeled = false;
      if (oldmid) {
        var oldmidLabels = this.labels[oldmid];

        // Check for any non-default labels for oldmid
        for (var vid in oldmidLabels) {
          if (oldmidLabels[vid] !== Label.AssumedRelevant) {
            labeled = true;
            break;
          }
        }

        // Git rid of oldmid labels
        if (mid == oldmid) {
          if (labeled) {
            this.labels[oldmid] = {};
          }
        }
        else {
          delete this.labels[oldmid];
        }
      }

      // Initialize mid labels
      if (mid && mid != oldmid) {
        this.labels[mid] = {};
      }

      // Report only if method or labels changed
      this.selected[cid] = mid;
      if (oldmid !== mid || labeled) {
        this.schedule();
      }
    }

    /*----------------------------------------------------------------
     * Get label for edge (vid, mid).  Does not check to see if
     * (vid, mid) is actually in the graph; default return value is
     * AssumedRelevant.
     */
    getLabel( vid: string, mid: string ) {
      var midLabels = this.labels[mid];
      if (midLabels) {
        var label = midLabels[vid];
        return label ? label : Label.AssumedRelevant;
      }
      else {
        return Label.AssumedRelevant;
      }
    }

    /*----------------------------------------------------------------
     * Set label for edge (vid, mid).  Has no effect if mid is not
     * selected method.
     */
    setLabel( vid: string, mid: string, label: Label ) {
      var midLabels = this.labels[mid]
      if (midLabels) {
        if (midLabels[vid] !== label) {
          midLabels[vid] = label;
          this.schedule();
        }
      }
    }

    /*----------------------------------------------------------------
     * Schedule a call to notify (unless one is already scheduled)
     */
    private schedule() {
      if (! this.scheduled) {
        this.scheduled = true;
        u.schedule( 4, this.notify, this );
      }
    }

    /*----------------------------------------------------------------
     * Perform an notify
     */
    private notify() {
      this.scheduled = false;
      this.sendNext( this );
    }

  }

}