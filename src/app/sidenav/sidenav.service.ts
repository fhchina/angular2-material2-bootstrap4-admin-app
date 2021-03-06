import { Injectable,Inject } from '@angular/core';
import { SidenavItem } from './item/item.model';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class SidenavService {

  private _itemsSubject: BehaviorSubject<SidenavItem[]> = new BehaviorSubject<SidenavItem[]>([]);
  private _items: SidenavItem[] = [];
  items$: Observable<SidenavItem[]> = this._itemsSubject.asObservable();

  private _currentlyOpenSubject:BehaviorSubject<SidenavItem[]>=new BehaviorSubject<SidenavItem[]>([]);
  private _currentlyOpen: SidenavItem[]=[];
  currentlyOpen$:Observable<SidenavItem[]> = this._currentlyOpenSubject.asObservable();

  constructor(@Inject('sidebar') private sidebarService) {
    let dashboard = this.addItem('Dashboard', 'home', '/', 1);
    let components =  this.addItem('UI Kit', 'bubble_chart', null, 3);
    this.addSubItem(components, 'Buttons', '/materials/buttons', 1);
    this.addSubItem(components, 'Cards', '/materials/cards', 2);
    this.addSubItem(components, 'Lists', '/materials/lists', 3);
    this.addSubItem(components, 'Menu', '/materials/menu', 3);
    this.addSubItem(components, 'Slider', '/materials/slider', 3);
    this.addSubItem(components, 'Snack-Bar', '/materials/snackbar', 3);
    this.addSubItem(components, 'Toast', '/materials/toast', 3);
    this.addSubItem(components, 'Tooltips', '/materials/tooltips', 3);
    this.addSubItem(components, 'Dialogs', '/materials/dialogs', 3);
    this.addSubItem(components, 'Tabs', '/materials/tabs', 3);

    let forms = this.addItem('Forms', 'format_color_text', null, 4);
    this.addSubItem(forms, 'Form Elements', '/forms/elements', 1);
    this.addSubItem(forms, 'Form validation', '/forms/validation', 1);
    this.addSubItem(forms, 'editor', '/forms/editor', 1);

    let tables =  this.addItem('Tables', 'list', null, 5);
    this.addSubItem(tables, 'Static Tables', '/tables/static', 1);
    this.addSubItem(tables, 'Datatable', '/tables/datatable', 2);

    let charts = this.addItem('Charts', 'equalizer', '/charts', 1);

    let pages =  this.addItem('Pages', 'content_copy', null, 7);
    this.addSubItem(pages, 'about', '/pages/about', 1);
    this.addSubItem(pages, 'services', '/pages/services', 1);
    this.addSubItem(pages, 'contact', '/pages/contact', 1);
    this.addSubItem(pages, 'careers', '/pages/careers', 1);
    this.addSubItem(pages, 'profile', '/pages/profile', 1);
    this.addSubItem(pages, 'blog', '/pages/blog', 1);
    this.addSubItem(pages, 'faqs', '/pages/faqs', 1);
    this.addSubItem(pages, 'terms', '/pages/terms', 1);
    this.addSubItem(pages, '收藏神器', '/pages/collection', 1);

    let extraPages =  this.addItem('Extra Pages', 'more_horiz', null, 8);
    this.addSubItem(extraPages, '登录', '/pages/sigin', 1);
    this.addSubItem(extraPages, '注册', '/pages/sigup', 1);

    let apps =  this.addItem('Apps', 'apps', null, 8);
    this.addSubItem(apps, 'Task', '/apps/todo/ALL', 1);
    this.addSubItem(apps, 'Chat', '/apps/chats', 1);
    this.addSubItem(apps, 'Mail', '/apps/mail', 1);
    this.addSubItem(apps, '码农庄园', '/apps/navigation', 1);
  }

  addItem(name: string, icon: string, route: string, position: number, badge?: string, badgeColor?: string) {
    let item = new SidenavItem({
      name: name,
      icon: icon,
      route: route,
      subItems: [ ],
      position: position || 99,
      badge: badge || null,
      badgeColor: badgeColor || null
    });

    this._items.push(item);
    this._itemsSubject.next(this._items);

    return item;
  }

  addSubItem(parent: SidenavItem, name: string, route: string, position: number) {
    let item = new SidenavItem({
      name: name,
      route: route,
      parent: parent,
      subItems: [ ],
      position: position || 99
    });

    parent.subItems.push(item);
    this._itemsSubject.next(this._items);

    return item;
  }

  isOpen(item: SidenavItem) {
    return (this._currentlyOpen.indexOf(item) != -1);
  }

  toggleCurrentlyOpen(item: SidenavItem) {
    let currentlyOpen = this._currentlyOpen;
    if(this.isOpen(item)) {
      if(currentlyOpen.length >1) {
        currentlyOpen.length = this._currentlyOpen.indexOf(item);
      } else {
        currentlyOpen = [];
      }
    } else {
      currentlyOpen = this.getAllParents(item);
    }

    this._currentlyOpen = currentlyOpen;
    this._currentlyOpenSubject.next(currentlyOpen);
  }

  getAllParents(item: SidenavItem, currentlyOpen:SidenavItem[]=[]) {
    currentlyOpen.unshift(item);

    if(item.hasParent()) {
      return this.getAllParents(item.parent, currentlyOpen);
    } else {
      return currentlyOpen;
    }
  }
}
