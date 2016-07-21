debug = require('debug')
log = debug('bricktag')
trakless2 = require('trakless')
loadScript = require('load-script-once')
gmodal2 = require('gmodal')
dom = require('dom')

if console?
  if (console.log.bind?)
    log.log = console.log.bind(console);

win = window
doc = win.document
gsnContext = win.GSNContext
_tk = win._tk
myBrick = win.Gsn or {}
oldGsnAdvertising = myBrick.Advertising
lastRefreshTime = 0
if oldGsnAdvertising?
  # prevent multiple load
  if oldGsnAdvertising.pluginLoaded
    return

formatDate = (date) ->
  d = new Date()
  if (date)
    d = new Date(date)

  month = '' + d.getMonth() + 1
  day = '' + d.getDate()
  year = d.getFullYear()

  if month.length < 2
    month = '0' + month
  if day.length < 2
    day = '0' + day
  [
    year
    month
    day
  ].join ''

config = {
  pixelUrl: "//cdn.gsngrocers.com/pi.gif",
  xstoreUrl: "//cdn.gsngrocers.com/script/xstore.html"
}

class Plugin
  pluginLoaded: true
  iframeContent: '<!DOCTYPE html><html> <head> <title></title> <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script> <script src="//cdnjs.cloudflare.com/ajax/libs/jquery-migrate/1.2.1/jquery-migrate.min.js"></script> </head> <body> <script>var pwin=window.parent; try{var testwin=window.top.bricktag; pwin=window.top;}catch (e){}; try{var bt=window.bricktag=document.bricktag=pwin.bricktag; var url=bt.getAnxUrl($(document).width(), $(document).height()); document.write(url);}catch (e){}; </script> <!--REPLACEME--></body></html>'
  defP:
    # default action parameters *optional* means it will not break but we would want it if possible
     # required - example: registration, coupon, circular
    page: undefined
     # required - specific action/event/behavior name (prev circular, next circular)
    evtname: undefined
     # optional* - string identifying the department
    dept: undefined
    # -- Device Data --
     # optional* - kios, terminal, or device Id
     # if deviceid is not unique, then the combination of storeid and deviceid should be unique
    deviceid: undefined
     # optional* - the storeId
    storeid: undefined
     # these are consumer data
     # optional* - the id you use to uniquely identify your consumer
    consumerid: undefined
     # optional* - determine if consumer is anonymous or registered with your site
    isanon: true
     # optional * - string identify consumer loyalty card id
    loyaltyid: undefined
    # -- Consumer Interest --
    aisle: undefined           # optional - ailse
    category: undefined        # optional - category
    shelf: undefined           # optional - shelf
    brand: undefined           # optional - default brand
    pcode: undefined           # string contain product code or upc
    pdesc: undefined           # string containing product description
    latlng: undefined       # latitude, longitude if possible
     # optional - describe how you want to categorize this event/action.
     # ie. this action is part of (checkout process, circular, coupon, etc...)
    evtcategory: undefined
     # option - event property
     # example: item id
    evtproperty: undefined
     # option - event action
     # example: click
    evtaction: undefined
     # example: page (order summary), evtcategory (checkout), evtname (transaction total), evtvalue (100) for $100
    evtvalue: undefined
    # additional parameters TBD
  translator:
    page: 'dt'
    evtname: 'en'
    dept: 'dpt'
    deviceid: 'dvceid'
    storeid: 'stid'
    consumerid: 'uid'
    isanon: 'anon'
    loyaltyid: 'loyid'
    aisle: 'aisle'
    category: 'cat'
    shelf: 'shf'
    brand: 'bn'
    pcode: 'ic'
    pdesc: 'in'
    latlng: 'lln'
    evtcategory: 'ec'
    evtproperty: 'ep'
    evtlabel: 'el'
    evtaction: 'ea'
    evtvalue: 'ev'
  isDebug: false
  hasLoad: false
  brickid: 0
  anxTagId: undefined
  onAllEvents: undefined
  oldGsnAdvertising: oldGsnAdvertising
  minSecondBetweenRefresh: 2
  timer: undefined
  depts: ''
  configLoaded: false
  scriptLoaded: false

  ###*
  # get network id
  #
  # @return {Object}
  ###
  getNetworkId: ()->
    self = @
    networkId = trakless2.util.session('anxTagId')
    return networkId

  ###*
  # emit a brickevent
  #
  # @param {String} en - event name
  # @param {Object} ed - event data
  # @return {Object}
  ###
  emit: (en, ed) ->
    if en.indexOf('brickevent') < 0
      en = 'brickevent:' + en

    # a little timeout to make sure click tracking stick
    win.setTimeout ->
      _tk.emitTop en,
        type: en
        en: en.replace('brickevent:', '')
        detail: ed

      if typeof @onAllEvents == 'function'
        @onAllEvents
          type: en
          en: en.replace('brickevent:', '')
          detail: ed
      return
    , 100
    @

  ###*
  # listen to a brickevent
  #
  # @param {String} en - event name
  # @param {Function} cb - callback
  # @return {Object}
  ###
  on: (en, cb) ->
    if en.indexOf('brickevent') < 0
      en = 'brickevent:' + en

    trakless.on en, cb
    @

  ###*
  # detach from event
  #
  # @param {String} en - event name
  # @param {Function} cb - cb
  # @return {Object}
  ###
  off: (en, cb) ->
    if en.indexOf('brickevent') < 0
      en = 'brickevent:' + en

    trakless.off en, cb
    @

  ###*
  # logging data
  #
  # @param {String} message - log message
  # @return {Object}
  ###
  log: (message) ->
    self = myBrick.Advertising

    if (self.isDebug or debug.enabled('bricktag'))
      self.isDebug = true
      if (typeof message is 'object')
        try
          message = JSON.stringify(message)
        catch
      log(message)
    @

  ###*
  # trigger action tracking
  #
  # @param {String} actionParam
  # @return {Object}
  ###
  trackAction: (actionParam) ->
    self = myBrick.Advertising
    tsP = {}
    if typeof actionParam is 'object'
      for k, v of actionParam when v?
        k2 = self.translator[k]
        if (k2)
          tsP[k2] = v

    _tk.track('brick', tsP)

    self.log actionParam

    @

  ###*
  # utility method to normalize category
  #
  # @param {String} keyword
  # @return {String}
  ###
  cleanKeyword: (keyword) ->
    result = keyword.replace(/\W+/gi, '_')
    if result.toLowerCase?
      result = result.toLowerCase()

    return result

  ###*
  # add a dept
  #
  # @param {String} dept
  # @return {Object}
  ###
  addDept: (dept) ->
    self =  myBrick.Advertising
    if dept?
      goodDept = self.cleanKeyword dept
      goodDept = ",#{goodDept}"
      if (self.depts.indexOf(goodDept) < 0)
        self.depts = "#{goodDept}#{self.depts}"
    @

  ###*
  # fire a tracking url
  #
  # @param {String} url
  # @return {Object}
  ###
  ajaxFireUrl: (url) ->
    if typeof url is 'string'
      # bad or empty url
      if url.length < 10
        return

      # this is to cover the cache buster situation
      url = url.replace('%%CACHEBUSTER%%', (new Date).getTime())
      img = new Image(1,1)
      img.src = url
    @

  ###*
  # Trigger when a product is clicked.  AKA: clickThru
  #
  ###
  clickProduct: (click, categoryId, brandName, productDescription, productCode, quantity, displaySize, regularPrice, currentPrice, savingsAmount, savingsStatement, adCode, creativeId) ->
    @ajaxFireUrl click
    @emit 'clickProduct',
      myPlugin: this
      CategoryId: categoryId
      BrandName: brandName
      Description: productDescription
      ProductCode: productCode
      DisplaySize: displaySize
      RegularPrice: regularPrice
      CurrentPrice: currentPrice
      SavingsAmount: savingsAmount
      SavingsStatement: savingsStatement
      AdCode: adCode
      CreativeId: creativeId
      Quantity: quantity or 1
    return

  ###*
  # Trigger when a brick offer is clicked.  AKA: brickRedirect
  #
  ###
  clickBrickOffer: (click, offerCode, checkCode) ->
    @ajaxFireUrl click
    @emit 'clickBrickOffer',
      myPlugin: this
      OfferCode: offerCode or 0
    return

  ###*
  # Trigger when a brand offer or shopper welcome is clicked.
  #
  ###
  clickBrand: (click, brandName) ->
    @ajaxFireUrl click
    @setBrand brandName
    @emit 'clickBrand',
      myPlugin: this
      BrandName: brandName
    return

  ###*
  # Trigger when a promotion is clicked.  AKA: promotionRedirect
  #
  ###
  clickPromotion: (click, adCode) ->
    @ajaxFireUrl click
    @emit 'clickPromotion',
      myPlugin: this
      AdCode: adCode
    return

  ###*
  # Trigger when a recipe is clicked.  AKA: recipeRedirect
  #
  ###
  clickRecipe: (click, recipeId) ->
    @ajaxFireUrl click
    @emit 'clickRecipe', RecipeId: recipeId
    return

  ###*
  # Trigger when a generic link is clicked.  AKA: verifyClickThru
  #
  ###
  clickLink: (click, url, target) ->
    if target == undefined or target == ''
      target = '_top'

    @ajaxFireUrl click
    @emit 'clickLink',
      myPlugin: this
      Url: url
      Target: target
    return

  ###*
  # Trigger custom event.
  #
  ###
  clickCustom: (click, name, value) ->
    @ajaxFireUrl click
    @emit 'clickCustom',
      myPlugin: this
      Name: name
      Value: value
    return

  ###*
  # handle a dom event
  #
  ###
  actionHandler: (evt, target) ->
    self = myBrick.Advertising
    elem = target
    payLoad = {}
    if elem?
      # extract data tag
      allData = trakless.util.allData(elem)
      for k, v in allData when /^brick/gi.test(k)
        realk = /^brick/i.replace(k, '').toLowerCase()
        payLoad[realk] = v

    self.refresh payLoad
    return self

  ###*
   * get the dimension
   * @param  {Object} allData element attribute
   * @return {Array}         array of dimensions
  ###
  getDimensions: (allData) ->
    self = @
    dimensions = []
    dimensionsData = allData['dimensions']

    # Check if data-dimensions are specified. If they aren't, use the dimensions of the ad unit div.
    if dimensionsData
      dimensionGroups = dimensionsData.split(',')
      for v, k in dimensionGroups
        dimensionSet = v.split('x')
        dimensions.push [
          parseInt(dimensionSet[0], 10)
          parseInt(dimensionSet[1], 10)
        ]
    else
      dimensions = [[0,0]]

    return dimensions

  ###*
  # internal method for refreshing adpods
  #
  ###
  refreshAdPodsInternal: (actionParam, forceRefresh) ->
    self = myBrick.Advertising
    payLoad = actionParam or self.actionParam or {}
    for k, v of self.defP when v?
      if (!payLoad[k])
        payLoad[k] = v

    # track payLoad
    payLoad.siteid = self.brickid
    # self.trackAction payLoad
    canRefresh = ((new Date).getTime() / 1000 - lastRefreshTime) >= self.minSecondBetweenRefresh

    if (forceRefresh || canRefresh)
      lastRefreshTime = (new Date()).getTime() / 1000;

      # refreshing adpods
      adpods = dom('.brickunit')

      for adUnit, k in adpods
        self.createIframe(adUnit)
    @

  ###*
   * callback success method
   * @param  {Object} svrRsp server response
   * @return {Object}
  ###
  configSuccess: (svrRsp) ->
    self = @
    # remove handler for security reason
    win.brickConfigCallback = null

    rsp = svrRsp
    if (typeof svrRsp is 'string')
      rsp = JSON.parse(svrRsp)

    self = myBrick.Advertising
    win.bricktag.configLoaded = true

    if rsp
      _tk.util.session('anxTagId', rsp[0]?.appNexusPlacementTagId)
      data = {
        s1: rsp[0]?.brickTagScriptUrl
        s2: rsp[0]?.brickTagFrameContent
      }
      _tk.util.session('brickTag', rsp[0])
      self.ensureScriptLoaded()
      self.refreshAdPodsInternal(self.actionParam, true)

  ###*
   * make sure config script are loaded
   * @return {Object}
  ###
  ensureScriptLoaded: () ->
    if (!win.bricktag.configLoaded or win.bricktag.scriptLoaded)
      return

    win.bricktag.scriptLoaded = true
    cfg = _tk.util.session('brickTag')
    if (cfg)
      cfg = JSON.parse(cfg)
    else
      cfg = {}

    btscript = cfg.s1 + ""
    cb = (new Date()).getTime()
    # load additional script
    if (btscript.indexOf('//') >= 0)
      loadScript(btscript.replace('%%CACHEBUSTER%%', cb))

    frameContent = cfg.s2
    if (frameContent)
      self.iframeContent = self.iframeContent.replace("<!--REPLACEME-->", frameContent.replace('%%CACHEBUSTER%%', cb))

  ###*
   * config request method
   * @return {Object}
  ###
  loadConfig: (cb) ->
    self = @
    if self.getNetworkId() or win.bricktag.configLoaded
      self.ensureScriptLoaded()
      cb()
      return

    url = "//upload.gsngrocers.com/feed/clientconfig?cb=#{formatDate()}&sid=#{self.brickid}&callback=brickConfigCallback"
    dataType = 'json'

    # fallback to jsonp for IE lt 10
    # this allow for better caching on non-IE browser
    # if I am opera I need to not enter this function
    win.brickConfigCallback = (rsp) ->
      self.configSuccess(rsp)

    loadScript(url)
    self

  ###*
  # adpods refresh
  #
  ###
  refresh: (actionParam, forceRefresh) ->
    self = myBrick.Advertising

    # no need to refresh if brickid does not exists
    if (self.brickid)
      self.actionParam = actionParam
      self.loadConfig () =>
        # need to be in it's own function here to use local var
        self.refreshAdPodsInternal(actionParam, forceRefresh)
    @

  ###*
  # set global defaults
  #
  ###
  setDefault: (defParam) ->
    self = myBrick.Advertising
    if typeof defParam is 'object'
      for k, v of defParam when v?
        self.defP[k] = v
    @

  getAnxUrl: (width, height) ->
    self = @
    networkId = self.getNetworkId()
    cb = (new Date()).getTime()
    url = "<script src=\"http://ib.adnxs.com/ttj?id=#{networkId}&size=#{width}x#{height}&cb=#{cb}\"></script>";

  createIframe: (parentEl) ->
    self = @
    if (!self.getNetworkId())
      return self

    $adUnit = dom(parentEl)
    $adUnit.html('')
    allData = trakless.util.allData(parentEl)
    dimensions = self.getDimensions(allData)

    iframe = doc.createElement('iframe');
    iframe.className = 'brickframe'
    #iframe.id = tagId;
    #iframe.name = tagId;
    iframe.frameBorder = "0"
    iframe.marginWidth = "0"
    iframe.marginHeight = "0"
    iframe.scrolling = "no"
    iframe.setAttribute('border', '0');
    iframe.setAttribute('allowtransparency', "true");

    iframe.height = dimensions[0][1]
    iframe.width = dimensions[0][0]

    parentEl.appendChild iframe

    if iframe.contentWindow
      iframe.contentWindow.contents = self.iframeContent
      iframe.src = 'javascript:window["contents"]'
      return

    doc = iframe.document;
    if iframe.contentDocument
      doc = iframe.contentDocument

    doc.open()
    doc.write(self.iframeContent)
    doc.close()


  ###*
  # method for support refreshing with timer
  #
  ###
  refreshWithTimer: (actionParam) ->
    self = myBrick.Advertising
    if !actionParam?
      actionParam = { evtname: 'refresh-timer' }

    self.refresh(actionParam, true)
    timer = (self.timer or 0) * 1000

    if (timer > 0)
      setTimeout self.refreshWithTimer, timer

    @

  ###*
  # the onload method, document ready friendly
  #
  ###
  load: (brickid, isDebug) ->
    self = myBrick.Advertising
    if brickid
      self.brickid = brickid

    if isDebug
      self.isDebug = true
      debug.enable('bricktag')

    if self.hasLoad then return self
    self.hasLoad = true

    self.refreshWithTimer({ evtname: 'loading' })

myPlugin = new Plugin
myBrick.Advertising = myPlugin
myBrick.Advertising.brickRedirect = myPlugin.clickBrickOffer
myBrick.Advertising.clickBrand = myPlugin.clickBrand
myBrick.Advertising.clickThru = myPlugin.clickProduct
myBrick.Advertising.refreshAdPods = myPlugin.refresh

myBrick.Advertising.logAdImpression = ->
# empty function, does nothing

myBrick.Advertising.logAdRequest = ->
# empty function, does nothing

myBrick.Advertising.promotionRedirect = myPlugin.clickPromotion
myBrick.Advertising.verifyClickThru = myPlugin.clickLink
myBrick.Advertising.recipeRedirect = myPlugin.clickRecipe

# put GSN back online
win.Gsn = myBrick
win.bricktag = myBrick.Advertising

if gsnContext?
  buildqs = (k, v) ->
    if v?
      v = new String(v)
      if k is 'ProductDescription'
        # some product descriptions have '&amp;' which should not be replaced with '`'.
        v = v.replace(/&/, '`')
      k + '=' + v
    else

  myBrick.Advertising.on 'clickRecipe', (data) ->
    if data.type != 'brickevent:clickRecipe'
      return
    win.location.replace '/Recipes/RecipeFull.aspx?RecipeID=' + data.detail.RecipeId
    return

  myBrick.Advertising.on 'clickProduct', (data) ->
    if data.type != 'brickevent:clickProduct'
      return

    product = data.detail
    if product
      qs = new String('')
      qs += buildqs('DepartmentID', product.CategoryId)
      qs += '~' + buildqs('BrandName', product.BrandName)
      qs += '~' + buildqs('ProductDescription', product.Description)
      qs += '~' + buildqs('ProductCode', product.ProductCode)
      qs += '~' + buildqs('DisplaySize', product.DisplaySize)
      qs += '~' + buildqs('RegularPrice', product.RegularPrice)
      qs += '~' + buildqs('CurrentPrice', product.CurrentPrice)
      qs += '~' + buildqs('SavingsAmount', product.SavingsAmount)
      qs += '~' + buildqs('SavingsStatement', product.SavingsStatement)
      qs += '~' + buildqs('Quantity', product.Quantity)
      qs += '~' + buildqs('AdCode', product.AdCode)
      qs += '~' + buildqs('CreativeID', product.CreativeId)

      # assume there is this global function
      if typeof AddAdToShoppingList is 'function'
        AddAdToShoppingList qs

    # myBrick.Advertising.refresh()
    return

  myBrick.Advertising.on 'clickLink', (data) ->
    if data.type != 'brickevent:clickLink'
      return

    linkData = data.detail
    if linkData
      if !(typeof linkData.Target is 'string')
        linkData.Target = '_top'

      if linkData.Target is '_blank'
        # myBrick.Advertising.refresh()
      else
        url = _tk.util.trim(linkData.Url)
        if (url is 'circular')
          url = '/Shop/WeeklyAd.aspx'
        else if (url is 'coupons')
          url = '/Shop/Coupons.aspx'
        else if (url is 'recipecenter')
          url = '/Recipes/RecipeCenter.aspx'
        else if (url is 'registration')
          url = '/Profile/SignUp.aspx'

        # assume this is an internal redirect
        win.location.replace url

    return

# auto init with attributes
# at this point, we expect Gsn.Advertising to be available from above

aPlugin = myBrick.Advertising
if !aPlugin then return

attrs =
  debug: (value) ->
    return unless typeof value is "string"
    aPlugin.isDebug = value isnt "false"
    if (value)
      debug.enable('bricktag')
  source: (value) ->
    return unless typeof value is "string"
    aPlugin.source = value
  brickid: (value) ->
    return unless value
    aPlugin.brickid = value
    trakless.setSiteId(value)
  timer: (value) ->
    return unless value
    aPlugin.timer = value
  cleanrefresh: (value) ->
    return unless value
    aPlugin.cleanRefresh = value

for script in doc.getElementsByTagName("script")
  if /bricktag/i.test(script.src)
    for prefix in ['','data-']
      for k,fn of attrs
        fn script.getAttribute prefix+k


trakless.setPixel(config.pixelUrl)
trakless.store.init({url: config.xstoreUrl, dntIgnore: true})

trakless.util.ready ->
  aPlugin.load()

module.exports = myBrick
