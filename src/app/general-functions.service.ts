import { Injectable } from '@angular/core';
import * as removeAccent from 'remove-accents'
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { AngularFireAuth } from '../../node_modules/angularfire2/auth';
declare var $: any;
@Injectable({
  providedIn: 'root',
})
export class GeneralFunctionsService {


  constructor(private _afAuth: AngularFireAuth,private _afs: AngularFirestore) { }

  public replaceSpecialChars(string) {
    var oldString = string ? string : '';
    var re = / /g;
    var newString = removeAccent.remove(oldString.replace(re, '-')).toLowerCase();
    console.log(newString);
    return newString
  }


/*   public getDoc(where, condition, value): any {
    var data
    this._afs.collection('posts').ref.where('post_author', '==', 'test admin').get().then((res) => {

      res.forEach(result => {
        data = result.data()

      }, err => console.log(err))
    }).then(res => {

      return data;
    });
  } */
  public checkLogin() {
    return this._afAuth.authState.subscribe(res => {
      return res
    }, error =>{
      return error
    })

  }
  public logout(): Promise<any>{
    return this._afAuth.auth.signOut().then(res =>{
      return res;
    }, error =>{
      return error;
    });
  }

  showNotification(color, align, message) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    //const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "notifications",
      message: message

    }, {
        type: type[color],
        timer: 4000,
        placement: {
          from: 'top',
          align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }

  public getPosts() {

    var posts;
    posts = this._afs.collection('posts', ref => ref.orderBy('post_date', 'desc')).valueChanges();

    return posts;
  }
  public getDb() {
    return this._afs;
  }
  getMenuItems() {
    const menu = this._afs.collection('menu').valueChanges();
    return menu;
  }
  public getConfigs() {
    var configs = this._afs.doc('configurations/general');
    return configs.valueChanges()
  }
  public getPostContent() { }
  public getPostDate() { }
  public getPostCategories() { }
  public getPostTags() { }
  public getPostAuthor() { }
  public getPostThumbnail() { }
  /* public getMenuItems(){
    const menu = [];
    return menu;
  } */

}

//categories

/* CREATE TABLE `wp_terms` (
  `term_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `slug` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `term_group` bigint(10) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `wp_terms`
--

INSERT INTO `wp_terms` (`term_id`, `name`, `slug`, `term_group`) VALUES
(1, 'Sem categoria', 'sem-categoria', 0),
(2, 'Gif', 'gif', 0),
(3, 'Destaques', 'destaques', 0),
(4, 'besteiras', 'besteiras', 0),
(5, 'Quarta Categoria', 'quarta-categoria', 0),
(6, 'Header Menu', 'header-menu', 0),
(7, 'post-format-image', 'post-format-image', 0),
(8, 'Destaques', 'destaques', 0),
(9, 'noticias', 'noticias', 0),
(10, 'patrocinados', 'patrocinados', 0);
 */

//configs

/* CREATE TABLE `wp_options` (
  `option_id` bigint(20) UNSIGNED NOT NULL,
  `option_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `option_value` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `autoload` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'yes'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



(1, 'siteurl', 'http://localhost/culturapopularpe', 'yes'),
(2, 'home', 'http://localhost/culturapopularpe', 'yes'),
(3, 'blogname', 'Cultura Popular do Pernambuco', 'yes'),
(4, 'blogdescription', 'Só mais um site WordPress', 'yes'),
(5, 'users_can_register', '0', 'yes'),
(6, 'admin_email', 'dhoncrisley@hotmail.com', 'yes'),
(7, 'start_of_week', '0', 'yes'),
(8, 'use_balanceTags', '0', 'yes'),
(9, 'use_smilies', '1', 'yes'),
(10, 'require_name_email', '1', 'yes'),
(11, 'comments_notify', '1', 'yes'),
(12, 'posts_per_rss', '10', 'yes'),
(13, 'rss_use_excerpt', '0', 'yes'),
(14, 'mailserver_url', 'mail.example.com', 'yes'),
(15, 'mailserver_login', 'login@example.com', 'yes'),
(16, 'mailserver_pass', 'password', 'yes'),
(17, 'mailserver_port', '110', 'yes'),
(18, 'default_category', '1', 'yes'),
(19, 'default_comment_status', 'open', 'yes'),
(20, 'default_ping_status', 'open', 'yes'),
(21, 'default_pingback_flag', '1', 'yes'),
(22, 'posts_per_page', '10', 'yes'),
(23, 'date_format', 'j \\d\\e F \\d\\e Y', 'yes'),
(24, 'time_format', 'H:i', 'yes'),
(25, 'links_updated_date_format', 'j \\d\\e F \\d\\e Y, H:i', 'yes'),
(26, 'comment_moderation', '0', 'yes'),
(27, 'moderation_notify', '1', 'yes'),
(28, 'permalink_structure', '/%postname%/', 'yes'), */