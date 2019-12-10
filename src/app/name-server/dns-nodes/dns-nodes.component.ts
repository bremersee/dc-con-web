import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {DnsNode} from '../../shared/model/dns-node';
import {NameServerService} from '../../shared/service/name-server.service';
import {map} from 'rxjs/operators';
import {DnsNodeRecord} from '../../shared/model/dns-node-record';

@Component({
  selector: 'app-dns-nodes',
  templateUrl: './dns-nodes.component.html',
  styleUrls: ['./dns-nodes.component.css']
})
export class DnsNodesComponent implements OnInit {

  zoneName: string;

  // dnsNodes: Observable<Array<DnsNode>>;

  dnsNodeRecords: Observable<Array<DnsNodeRecord>>;

  constructor(private route: ActivatedRoute, private nameServerService: NameServerService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.zoneName = paramMap.get('zone') || '';
      // this.dnsNodes = this.nameServerService.getDnsNodes(this.zoneName);
      this.dnsNodeRecords = this.nameServerService.getDnsNodes(this.zoneName).pipe(map(nodes => {
        const table = new Array<DnsNodeRecord>();
        for (const dnsNode of nodes) {
          if (dnsNode.records && dnsNode.records.length > 0) {
            let i = 0;
            for (const dnsRecord of dnsNode.records) {
              table.push({
                node: dnsNode,
                record: dnsRecord,
                recordIndex: i
              });
              i = i + 1;
            }
          }
        }
        return table;
      }));
    });
  }

}
