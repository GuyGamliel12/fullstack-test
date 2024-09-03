import { Component, OnInit } from '@angular/core';
import { PublisherCardComponent } from './publisher-card/publisher-card.component';
import { CommonModule } from '@angular/common';
import { Publisher } from '../../types';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-publishers-container',
  standalone: true,
  imports: [PublisherCardComponent, CommonModule],
  templateUrl: './publishers-container.component.html',
  styleUrls: ['./publishers-container.component.css'],
})
export class PublishersContainerComponent implements OnInit {
  publishers: Array<Publisher> = [];

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.getPublishers().subscribe(
      (publishers) => {
        this.publishers = publishers;
      },
      (error) => {
        console.error('Error fetching publishers:', error);
      }
    );
  }

  addPublisher() {
    const publisherName = prompt('Enter the publisher name:');

    if (publisherName) {
      const newPublisher: Publisher = {
        publisher: publisherName,
        domains: [],
      };

      this.httpService.addPublisher(newPublisher).subscribe(
        (publisher) => {
          this.publishers.push(publisher);
        },
        (error) => {
          console.error('Error adding publisher:', error);
        }
      );
    }
  }
}
